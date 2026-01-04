#!/usr/bin/env python3
"""
Upload images to Cloudflare R2 storage.

Usage:
    export R2_ACCESS_KEY_ID="your-access-key"
    export R2_SECRET_ACCESS_KEY="your-secret-key"
    python3 scripts/upload-to-r2.py

Or with arguments:
    python3 scripts/upload-to-r2.py --access-key YOUR_KEY --secret-key YOUR_SECRET
"""

import os
import sys
import argparse
from pathlib import Path

try:
    import boto3
    from botocore.config import Config
except ImportError:
    print("Please install boto3: pip install boto3")
    sys.exit(1)

# R2 Configuration
R2_ENDPOINT = "https://819cc5c82aeb77dcbe9002c23c026748.r2.cloudflarestorage.com"
R2_BUCKET = "beeswarmsimulator"
R2_PUBLIC_URL = "https://imagers.beeswarmsimulator.org"

# Source directory
IMAGES_DIR = Path(__file__).parent.parent / "public" / "images"


def upload_to_r2(access_key: str, secret_key: str, dry_run: bool = False):
    """Upload all images to R2."""

    # Create S3 client for R2
    s3 = boto3.client(
        "s3",
        endpoint_url=R2_ENDPOINT,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        config=Config(signature_version="s3v4"),
    )

    # Content type mapping
    content_types = {
        ".png": "image/webp",  # Our PNGs are actually WebP
        ".webp": "image/webp",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
    }

    uploaded = 0
    skipped = 0
    errors = 0

    # Walk through images directory
    for image_path in IMAGES_DIR.rglob("*"):
        if not image_path.is_file():
            continue

        ext = image_path.suffix.lower()
        if ext not in content_types:
            continue

        # Create R2 key (relative path from images/)
        r2_key = str(image_path.relative_to(IMAGES_DIR))
        content_type = content_types[ext]

        if dry_run:
            print(f"[DRY RUN] Would upload: {r2_key} ({content_type})")
            uploaded += 1
            continue

        try:
            # Upload with cache headers
            s3.upload_file(
                str(image_path),
                R2_BUCKET,
                r2_key,
                ExtraArgs={
                    "ContentType": content_type,
                    "CacheControl": "public, max-age=31536000, immutable",
                },
            )
            print(f"[OK] {r2_key}")
            uploaded += 1
        except Exception as e:
            print(f"[ERROR] {r2_key}: {e}")
            errors += 1

    print(f"\n{'DRY RUN ' if dry_run else ''}Summary:")
    print(f"  Uploaded: {uploaded}")
    print(f"  Errors: {errors}")
    print(f"\nImages will be available at: {R2_PUBLIC_URL}/")


def main():
    parser = argparse.ArgumentParser(description="Upload images to Cloudflare R2")
    parser.add_argument("--access-key", help="R2 Access Key ID")
    parser.add_argument("--secret-key", help="R2 Secret Access Key")
    parser.add_argument("--dry-run", action="store_true", help="Don't actually upload")
    args = parser.parse_args()

    access_key = args.access_key or os.environ.get("R2_ACCESS_KEY_ID")
    secret_key = args.secret_key or os.environ.get("R2_SECRET_ACCESS_KEY")

    if not access_key or not secret_key:
        print("Error: R2 credentials required.")
        print("Set R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY environment variables")
        print("Or use --access-key and --secret-key arguments")
        sys.exit(1)

    upload_to_r2(access_key, secret_key, args.dry_run)


if __name__ == "__main__":
    main()
