"use client";

import { useEffect, useId, useRef, useState } from "react";
import { bookingNav, contactNav, mainNav } from "@/config/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { NavLink } from "./NavLink";

/**
 * Menu mobile (motif « disclosure ») : un bouton ouvre ou ferme la liste de liens.
 * Échap referme le menu et rend le focus au bouton.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-12 min-w-12 items-center gap-2 rounded-full border-2 border-ink bg-white px-4 font-display text-lg font-extrabold text-ink hover:bg-lens-light"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
        <span>{open ? "Fermer" : "Menu"}</span>
      </button>

      <nav
        id={panelId}
        aria-label="Menu principal"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-8rem)] overflow-y-auto border-t-4 border-arc bg-white shadow-card-hover"
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
          <li className="mb-3">
            <NavLink
              href={bookingNav.href}
              onClick={close}
              className={buttonClasses({ size: "lg", className: "w-full" })}
            >
              {bookingNav.label}
            </NavLink>
          </li>
          {[...mainNav, contactNav].map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                onClick={close}
                className="flex min-h-12 items-center rounded-2xl px-4 py-2 text-xl font-bold text-ink underline-offset-4 hover:bg-lens-light hover:underline"
                activeClassName="bg-lens-light text-primary underline"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
