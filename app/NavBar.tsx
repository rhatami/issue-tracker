"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VscCommentUnresolved } from "react-icons/vsc";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav
      className="flex space-x-6 border-b mb-5 px-5 h-14 items-center"
      key="navbar"
    >
      <Link href="/" key="logo">
        <VscCommentUnresolved />
      </Link>
      <ul className="flex space-x-6" key="nav-ul">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              key={link.label}
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
