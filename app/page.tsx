'use client'

'use client'

import { useState } from 'react'
import { App as PublicPortalApp } from '@/components/merged/public-portal/App'
import { UnifiedPortalShell, type PortalWorkspace } from '@/components/portal/UnifiedPortalShell'

export default function HomePage() {
  const [workspace, setWorkspace] = useState<PortalWorkspace | null>(null)

  return (
    <main className="platform-shell min-h-screen bg-background text-foreground">
      {workspace ? (
        <UnifiedPortalShell initialWorkspace={workspace} />
      ) : (
        <PublicPortalApp onOpenWorkspace={setWorkspace} />
      )}
    </main>
  )
}
