import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { SignUpCard } from '@/features/auth/components/sign-up-card';

const SignUpPage = async () => {
  const session = await auth();

  if (session) redirect('/');

  return (
    <div className="h-full flex items-center justify-center">
      <div className="size-full md:h-auto md:w-[420px]">
        <SignUpCard/>
      </div>
    </div>
  );
};

export default SignUpPage;
