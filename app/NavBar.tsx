"use client";
import { Flex, Box, Container } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VscCommentUnresolved } from "react-icons/vsc";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const { status, data: session } = useSession();

  return (
    <nav className="border-b mb-5 px-5 py-3" key="navbar">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
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
          </Flex>
          <Box>
            {status == "authenticated" && (
              <Link href="/api/auth/signout">Signout</Link>
            )}
            {status == "unauthenticated" && (
              <Link href="/api/auth/signin">Singin</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
