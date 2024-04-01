import { Newsreader as FontSerif } from 'next/font/google'

export const fontSerif = FontSerif({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400'],
  variable: '--font-serif',
})
