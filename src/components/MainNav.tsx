"use client";

import { useEffect, useState } from "react";
import { Images, PenLine, Flower2, Music } from "lucide-react";
import { anniversaryConfig } from "@/config/anniversary";

const SECTION_IDS = ["memories", "letter", "flowers", "song"] as const;

const LINKS = [
  { id: "memories", label: "Our Memories", icon: Images },
  { id: "letter", label: "A Letter for You", icon: PenLine },
  { id: "flowers", label: "Flowers for You", icon: Flower2 },
  { id: "song", label: "A Song for You", icon: Music },
];

export default function MainNav() {
  const [active, setActive] = useState<string>("");

  // Highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-brown/10 bg-ivory/85 backdrop-blur">
      <nav
        aria-label="Main sections"
        className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-4 py-3 sm:justify-between sm:px-6"
      >
        <a
          href="#memories"
          className="mr-3 hidden whitespace-nowrap font-serif text-sm italic text-brown/80 sm:block"
        >
          for {anniversaryConfig.recipientName}
        </a>

        <ul className="flex items-center gap-1 sm:gap-2">
          {LINKS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors sm:text-sm ${
                    isActive
                      ? "border-rose/60 bg-blush/60 text-brown"
                      : "border-transparent text-brown/60 hover:border-brown/15 hover:text-brown"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{label.replace("A ", "")}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
