'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Setting } from '@/payload/payload-types'
import { motion } from 'framer-motion'

export default function MainNav({ settings }: { settings: Setting }) {
  const pathname = usePathname()
  return (
    <>
      {settings.navItems?.length ? (
        <nav className="space-x-4">
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
                  <span className="relative py-1.5">
                    {item.label}
                    {item.href === pathname ? (
                      <motion.div
                        className="absolute inset-0 top-7 z-[-1] h-[1px] w-full bg-neutral-800 bg-gradient-to-r from-transparent to-neutral-900"
                        layoutId="sidebar"
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    ) : null}
                  </span>
                </Link>
              )
          )}
        </nav>
      ) : null}
    </>
  )
}
