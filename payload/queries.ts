import getPayloadClient from './payloadClient'

export const getSettings = async () => {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({
    slug: 'settings',
  })
  return settings
}

export const getProjects = async () => {
  const payload = await getPayloadClient()
  const projects = await payload.find({
    collection: 'projects',
  })
  return projects.docs
}
