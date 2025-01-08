import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="header">
      <Link href="/" className="md:flex-1 flex  items-center gap-2">
        <Image
          src="/assets/icons/logo.png"
          alt="Logo with name"
          width={40}
          height={40}
          className="hidden md:block rounded-full"
        />
        <span>Real-Time Docs</span>
      </Link>
      {children}
    </div>
  );
};

export default Header;
