import AuthForm from '@/components/auth/auth-form';
import { WallEntries } from '@/components/wall/wall-entries';
import { wallPageConfig } from '@/site.config';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: wallPageConfig.title,
  description: wallPageConfig.description,
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-4">Write on the wall.</h1>
      <Suspense>
        <AuthForm />
      </Suspense>

      <WallEntries />
    </section>
  );
}
