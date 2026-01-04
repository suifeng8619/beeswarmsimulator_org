import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for BSS Nexus - Learn how we collect, use, and protect your information.',
  alternates: {
    canonical: 'https://beeswarmsimulator.org/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: January 2026</p>

        <h2>Introduction</h2>
        <p>
          BSS Nexus (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting
          your personal data. This privacy policy explains how we collect, use, and safeguard your information
          when you visit our website at beeswarmsimulator.org.
        </p>

        <h2>Information We Collect</h2>
        <h3>Automatically Collected Information</h3>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and time spent</li>
          <li>Referring website</li>
          <li>IP address (anonymized)</li>
        </ul>

        <h3>Information You Provide</h3>
        <p>
          We currently do not require account registration. If you contact us, we may collect your email address
          and any information you choose to provide.
        </p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To improve our website and user experience</li>
          <li>To analyze website traffic and usage patterns</li>
          <li>To respond to your inquiries</li>
        </ul>

        <h2>Cookies and Tracking</h2>
        <p>
          We use privacy-focused analytics (Plausible) that does not use cookies and does not track users across websites.
          Your theme preference is stored locally in your browser.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the privacy practices
          of these external sites.
        </p>

        <h2>Data Retention</h2>
        <p>
          Analytics data is retained for a maximum of 24 months. We do not store personal identifying information.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access information we hold about you</li>
          <li>Request deletion of your data</li>
          <li>Opt out of analytics tracking</li>
        </ul>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our website is intended for general audiences. We do not knowingly collect personal information from
          children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the
          new policy on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us through our website.
        </p>

        <div className="mt-8 pt-8 border-t border-border">
          <Link href="/" className="text-honey hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
