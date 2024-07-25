import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-[500px] mx-auto mt-[40px] mb-[80px] flex flex-col gap-60px">
      {children}
    </main>
  );
};

export default Layout;
