"use client";
import {
  Flex,
  Box,
  Container,
  Avatar,
  DropdownMenu,
  Text,
} from "@radix-ui/themes";
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
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={
                      session.user!.image ? session.user!.image : "/profile.jpg"
                    }
                    fallback="U"
                    size="2"
                    radius="full"
                    className="curor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">Welcome {session.user!.name!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Signout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
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
