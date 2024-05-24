import { buttonVariants } from './button';

export default function Badge(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <a
      {...props}
      target="_blank"
      className={buttonVariants({
        variant: 'badge',
        size: 'link',
      })}
    />
  );
}
