import { buttonVariants } from './button'

export default function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className={buttonVariants({
        variant: 'badge',
        size: 'link',
      })}
    />
  )
}
