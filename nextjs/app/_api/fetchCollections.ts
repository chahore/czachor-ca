import { Projects } from '@/payload-types'

// export const getProjects = async (): Promise<Projects[]> =>
//   await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/projects`).then(
//     (res) => res.json()
//   )

export const getProjects = async (): Promise<Projects[]> => {
  const res: {
    docs: Projects[]
  } = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/projects`).then(
    (res) => res.json()
  ) // eslint-disable-line function-paren-newline

  return res?.docs ?? []
}
