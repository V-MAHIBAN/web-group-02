'use client'

import { useState } from 'react'
import AcademicStaffApp from '@/components/merged/academic-staff/App'
import EducationCommunityApp from '@/components/merged/education-community/App'
import VolunteerConnectApp from '@/components/merged/volunteer-connect/App'
import AdminPortalApp from '@/components/merged/admin-portal/App'

export type PortalWorkspace = 'academic' | 'community' | 'volunteer' | 'admin'

const labels: Record<PortalWorkspace, string> = {
  academic: 'Staff workspace',
  community: 'Community learning',
  volunteer: 'Volunteer portal',
  admin: 'Admin portal',
}

export function UnifiedPortalShell({ initialWorkspace = 'academic' }: { initialWorkspace?: PortalWorkspace }) {
  const [workspace, setWorkspace] = useState<PortalWorkspace>(initialWorkspace)

  return (
    <section className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-40 border-b border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <span className="mr-auto shrink-0 text-sm font-semibold tracking-wide">ACB Digital Platform</span>
          {(Object.keys(labels) as PortalWorkspace[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setWorkspace(id)}
              className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${workspace === id ? 'bg-primary text-primary-foreground' : 'text-secondary-foreground/75 hover:bg-secondary/70 hover:text-secondary-foreground'}`}
              aria-current={workspace === id ? 'page' : undefined}
            >
              {labels[id]}
            </button>
          ))}
        </div>
      </div>
      <div className="min-w-0 overflow-x-hidden">
        {workspace === 'academic' && <AcademicStaffApp />}
        {workspace === 'community' && <EducationCommunityApp />}
        {workspace === 'volunteer' && <VolunteerConnectApp />}
        {workspace === 'admin' && <AdminPortalApp />}
      </div>
    </section>
  )
}

export default UnifiedPortalShell
