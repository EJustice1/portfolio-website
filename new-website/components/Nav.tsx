"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  showWriting?: boolean;
}

export default function Nav({ showWriting = false }: NavProps) {
  const pathname = usePathname();
  const isWritingActive = pathname.startsWith("/writing");
  const isArchiveActive = pathname === "/archive";

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-inner">
          <Link href="/" className="nav-name">
            Ethan Justice
          </Link>

          <ul className="nav-links">
            <li>
              <Link
                href="/"
                className={pathname === "/" ? "active" : ""}
              >
                main
              </Link>
            </li>
            {showWriting && (
              <li>
                <Link
                  href="/writing"
                  className={isWritingActive ? "active" : ""}
                >
                  writing
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/archive"
                className={isArchiveActive ? "active" : ""}
              >
                archive
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
