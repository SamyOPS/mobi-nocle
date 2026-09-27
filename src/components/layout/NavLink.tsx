"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
};

/** Lien de navigation qui signale la page en cours (aria-current). */
export function NavLink({ href, children, className, activeClassName, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(className, isActive && activeClassName)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
