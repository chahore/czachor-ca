'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Settings } from '@/payload-types'
import { motion } from 'framer-motion'

export default function Nav({ settings }: { settings: Settings }) {
  const pathname = usePathname()
  return (
    <>
      {settings.navItems?.length ? (
        <nav className="space-x-4">
          {settings.navItems?.map((item, index) => {
            const slug =
              item.page?.slug === 'home' ? '/' : `/${item.page?.slug}`

            return (
              slug && (
                <Link
                  key={index}
                  href={slug}
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname === slug ? 'text-foreground' : 'text-foreground/60'
                  )}
                >
                  <span className="relative py-1.5">
                    {item.page?.title}
                    {pathname === slug ? (
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
            )
          })}
        </nav>
      ) : null}
    </>
  )
}
