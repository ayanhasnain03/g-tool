import type { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-[url(/bg.jpg)] bg-top bg-cover h-full flex flex-col">
      <div className="z-[4] size-full flex flex-col items-center justify-center">
        <div className="size-full md:h-auto md:w-[420px]">{children}</div>
      </div>

      <div
        aria-hidden
        className="fixed inset-0 bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.8),_rgba(0,_0,_0,_0.4),_rgba(0,_0,_0,_0.8))] z-[1]"
      />
    </div>
  );
};

export default AuthLayout;
