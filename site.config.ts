export type SiteConfig = typeof siteConfig
export type Projects = typeof projects

export const siteConfig = {
  title: 'David Czachor',
  description: 'Personal website of David Czachor',
  mainNav: [
    {
      title: 'home',
      href: '/',
    },
    {
      title: 'projects',
      href: '/projects',
    },
    {
      title: 'blog',
      href: '/blog',
    },
    {
      title: 'guestbook',
      href: '/guestbook',
    },
  ],
  socials: [
    {
      title: 'email',
      href: 'mailto:david@czachor.dev',
    },
    {
      title: 'linkedin',
      href: 'https://www.linkedin.com/in/davidczachor/',
    },
    {
      title: 'github',
      href: 'https://github.com/davidczachor',
    },
  ],
}

export const projects = [
  {
    title: 'simple react pokedex',
    description: 'A simple pokedex built with React',
    href: 'https://pokedex.czachor.dev',
  },
]

export const projectPageConfig = {
  title: 'Projects',
  description: 'A list of projects by David Czachor',
}

export const blogPageConfig = {
  title: 'Blog',
  description: 'A list of blog posts by David Czachor',
}

export const guestbookPageConfig = {
  title: 'Guestbook',
  description: 'A list of guestbook posts by David Czachor',
}
