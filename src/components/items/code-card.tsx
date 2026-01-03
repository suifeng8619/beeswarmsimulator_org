'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import type { Code } from '@/types/database'

interface CodeCardProps {
  code: Code
}

export function CodeCard({ code }: CodeCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.code)
      setCopied(true)
      toast.success('Code copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy code')
    }
  }

  return (
    <Card className={code.is_active ? '' : 'opacity-60'}>
      <CardContent className="flex items-center justify-between gap-4 p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <code className="font-mono text-lg font-semibold text-honey">
              {code.code}
            </code>
            <Badge variant={code.is_active ? 'default' : 'secondary'}>
              {code.is_active ? 'Active' : 'Expired'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1 truncate">
            {code.reward_description}
          </p>
        </div>

        {code.is_active && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
