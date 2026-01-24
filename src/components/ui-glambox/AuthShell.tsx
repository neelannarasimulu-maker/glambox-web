import type { ReactNode } from "react";

export type AuthShellProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

const AuthShell = ({ title, subtitle, children }: AuthShellProps) => {
  return (
    <div className="hero-bg min-h-screen px-4 py-12">
      <div className="container-glambox flex min-h-[calc(100vh-6rem)] items-center justify-center">
        <div className="glass card w-full max-w-2xl p-8 md:p-10">
          {title ? (
            <div className="mb-8 space-y-2 text-center">
              <p className="badge mx-auto w-fit">Glambox</p>
              <h1 className="headline-gradient text-3xl font-semibold md:text-4xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="text-sm text-white/70 md:text-base">{subtitle}</p>
              ) : null}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
