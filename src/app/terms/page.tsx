import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for BSS Nexus - Rules and guidelines for using our Bee Swarm Simulator tools.',
  alternates: {
    canonical: 'https://beeswarmsimulator.org/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: January 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using BSS Nexus (beeswarmsimulator.org), you agree to be bound by these Terms of Service.
          If you do not agree with any part of these terms, please do not use our website.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          BSS Nexus provides free tools and resources for Bee Swarm Simulator players, including:
        </p>
        <ul>
          <li>Item value lists and trading calculators</li>
          <li>Hive building tools</li>
          <li>Active codes lists</li>
          <li>AI-powered trading advice</li>
          <li>Bee and equipment information</li>
        </ul>

        <h2>3. User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the service for any illegal purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with other users&apos; enjoyment of the service</li>
          <li>Copy, modify, or distribute our content without permission</li>
          <li>Use automated systems to access the service excessively</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          The website design, code, and original content are owned by BSS Nexus. Bee Swarm Simulator and related
          game assets are property of Onett and Roblox Corporation. We are a fan-made resource and are not
          affiliated with or endorsed by the game developers.
        </p>

        <h2>5. Disclaimer of Warranties</h2>
        <p>
          The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee:
        </p>
        <ul>
          <li>The accuracy of item values or trading advice</li>
          <li>Uninterrupted or error-free operation</li>
          <li>That the service will meet your specific needs</li>
        </ul>

        <h2>6. Limitation of Liability</h2>
        <p>
          BSS Nexus shall not be liable for any damages arising from the use or inability to use our service,
          including but not limited to losses from trades made based on our information.
        </p>

        <h2>7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the content or
          practices of these external sites.
        </p>

        <h2>8. Modifications</h2>
        <p>
          We reserve the right to modify or discontinue the service at any time without notice. We may also
          update these terms, with changes effective upon posting.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with applicable laws, without regard
          to conflict of law principles.
        </p>

        <h2>10. Contact</h2>
        <p>
          For questions about these terms, please contact us through our website.
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
