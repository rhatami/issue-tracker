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
import Skeleton from "@/app/components/Skeleton";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3" key="navbar">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/" key="logo">
              <VscCommentUnresolved />
            </Link>
            <NavLinks />
          </Flex>
          <UserLogin />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex space-x-6" key="nav-ul">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            key={link.label}
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const UserLogin = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Singin
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image ? session!.user!.image : "/profile.jpg"}
            fallback="U"
            size="2"
            radius="full"
            className="curor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">Welcome {session!.user!.name!}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Signout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
