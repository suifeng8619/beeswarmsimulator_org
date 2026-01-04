import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for BSS Nexus - Important information about our fan-made Bee Swarm Simulator tools.',
  alternates: {
    canonical: 'https://beeswarmsimulator.org/disclaimer',
  },
}

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1>Disclaimer</h1>
        <p className="text-muted-foreground">Last updated: January 2026</p>

        <h2>Fan-Made Project</h2>
        <p>
          BSS Nexus is an <strong>unofficial, fan-made website</strong> created by community members for
          Bee Swarm Simulator players. We are <strong>not affiliated with, endorsed by, or connected to</strong>:
        </p>
        <ul>
          <li>Onett (the creator of Bee Swarm Simulator)</li>
          <li>Roblox Corporation</li>
          <li>Any official Bee Swarm Simulator channels or communities</li>
        </ul>

        <h2>Game Assets</h2>
        <p>
          All Bee Swarm Simulator game assets, including but not limited to bee images, item icons, and game
          terminology, are the property of their respective owners. These assets are used here under fair use
          for informational and educational purposes only.
        </p>

        <h2>Accuracy of Information</h2>
        <p>
          While we strive to provide accurate and up-to-date information, we cannot guarantee:
        </p>
        <ul>
          <li>
            <strong>Item Values:</strong> Values are community-estimated and may differ from actual trading
            experiences. Market conditions change frequently.
          </li>
          <li>
            <strong>Trading Advice:</strong> AI-generated suggestions are for reference only. Always use your
            own judgment when trading.
          </li>
          <li>
            <strong>Game Codes:</strong> Codes may expire without notice. We update our list regularly but
            cannot guarantee real-time accuracy.
          </li>
          <li>
            <strong>Game Mechanics:</strong> Information about bees, beequips, and other game elements may
            become outdated after game updates.
          </li>
        </ul>

        <h2>Trading Risks</h2>
        <p className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <strong>Important:</strong> Trading in Bee Swarm Simulator carries inherent risks. BSS Nexus is not
          responsible for any losses, scams, or unfavorable trades that may occur. Always:
        </p>
        <ul>
          <li>Verify trade values with multiple sources</li>
          <li>Be cautious of offers that seem too good to be true</li>
          <li>Never share your Roblox account credentials</li>
          <li>Use official in-game trading systems only</li>
        </ul>

        <h2>No Warranties</h2>
        <p>
          This website and its content are provided &quot;as is&quot; without any warranties, express or implied.
          We make no representations about the suitability, reliability, or accuracy of the information contained
          on this website.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          In no event shall BSS Nexus be liable for any direct, indirect, incidental, consequential, or punitive
          damages arising from your use of this website or reliance on any information provided herein.
        </p>

        <h2>External Links</h2>
        <p>
          This website may contain links to external websites. We have no control over the content and nature
          of these sites and are not responsible for their content or privacy practices.
        </p>

        <h2>Changes</h2>
        <p>
          We reserve the right to modify this disclaimer at any time. Changes will be effective immediately
          upon posting to this page.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions or concerns about this disclaimer, please contact us through our website.
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
