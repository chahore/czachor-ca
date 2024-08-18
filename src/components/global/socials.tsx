import { siteConfig } from '@/site.config';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { EmailIcon, GithubIcon, LinkedInIcon } from './icons';

export default async function Socials() {
  const iconClassName = 'h-4 w-4';

  const getSocialIcon: Record<string, JSX.Element> = {
    linkedin: <LinkedInIcon className={iconClassName} />,
    github: <GithubIcon className={iconClassName} />,
    email: <EmailIcon className={iconClassName} />,
  };
  return (
    <div>
      {siteConfig.socials.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${title} in a new tab`}
          className={buttonVariants({
            size: 'icon',
            variant: 'ghost',
          })}
        >
          {getSocialIcon[title]}
          <span className="sr-only">{title}</span>
        </Link>
      ))}
    </div>
  );
}
