import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href="/" className="md:flex-1 flex items-center gap-2">
        <Image
          src="/assets/icons/logo.png"
          alt="Real time documents logo"
          width={40}
          height={40}
          className=" rounded-full"
        />
        <span>Real-Time Docs</span>
      </Link>
      {children}
    </div>
  );
};

export default Header;
