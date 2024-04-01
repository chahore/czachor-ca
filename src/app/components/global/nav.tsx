'use client'

import Link from 'next/link'
import { cn } from '@/src/lib/utils'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { siteConfig } from '@/site.config'

export default function Nav() {
  let pathname = usePathname()
  if (pathname.includes('/blog/')) {
    pathname = '/blog'
  }
  return (
    <>
      {siteConfig.mainNav?.length ? (
        <nav className="space-x-4">
          {siteConfig.mainNav?.map(
            (item, index) =>
              item && (
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
                    {item.title}
                    {pathname === item.href ? (
                      <motion.div
                        className="absolute inset-0 top-7 z-[-1] h-[1px] w-full bg-foreground/10 bg-gradient-to-r from-transparent to-background"
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
