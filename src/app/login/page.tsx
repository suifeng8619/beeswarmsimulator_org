import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Construction } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Sign In - Coming Soon',
  description: 'User accounts and sign in functionality is coming soon to BSS Nexus.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-honey/20 flex items-center justify-center">
            <Construction className="h-10 w-10 text-honey" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>

        <p className="text-muted-foreground mb-8">
          User accounts and sign in functionality is currently under development.
          Soon you&apos;ll be able to save your hive builds, track trades, and sync your data across devices.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-secondary/50 text-left">
            <h2 className="font-semibold mb-2">Planned Features:</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>- Save and sync hive builds</li>
              <li>- Track your trading history</li>
              <li>- Personalized AI advisor suggestions</li>
              <li>- Custom value list preferences</li>
            </ul>
          </div>

          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
