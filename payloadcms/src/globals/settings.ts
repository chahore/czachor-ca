import { GlobalConfig } from 'payload/types'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  typescript: {
    interface: 'Settings',
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Nav Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Href',
        },
      ],
    },
    {
      name: 'linkedIn',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'github',
      type: 'text',
      label: 'GitHub URL',
    },
  ],
}
