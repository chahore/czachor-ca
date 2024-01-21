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
      title: 'work',
      href: '/work',
    },
    {
      title: 'wall',
      href: '/wall',
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
    title: 'Simple React Pokedex',
    description: 'A simple pokedex built with React',
    href: 'https://pokedex.czachor.dev',
  },
]

export const projectPageConfig = {
  title: 'Work',
  description: 'A showcase of work done by David Czachor',
}

export const wallPageConfig = {
  title: 'Wall',
  description: 'Write on the wall.',
}
