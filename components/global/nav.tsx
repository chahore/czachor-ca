'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Setting } from '@/payload/payload-types'

export default function MainNav({ settings }: { settings: Setting }) {
  const pathname = usePathname()
  return (
    <>
      {settings.navItems?.length ? (
        <nav className="space-x-6">
          {settings.navItems?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}
                >
                  {item.label}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </>
  )
}
