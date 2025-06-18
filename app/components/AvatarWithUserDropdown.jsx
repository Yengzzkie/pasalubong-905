"use client";
import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  InboxArrowDownIcon,
  PowerIcon,
  UserCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AvatarWithUserDropdown({ userData }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // profile menu component
  const profileMenuItems = [
    {
      label: "Create a Post",
      icon: PencilSquareIcon,
      link: `/post/${userData?.id}`,
    },
    {
      label: "My Postings",
      icon: UserCircleIcon,
      link: `/user/${userData?.id}`,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      link: `/user/${userData?.id}/profile`,
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
      link: "/inbox",
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      link: "",
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center !rounded-full p-0 !w-12 !h-12 !border-none cursor-pointer"
        >
          <Avatar
            variant="circular"
            size="md"
            alt={userData?.name}
            withBorder={true}
            color="blue-gray"
            className="p-0.5 h-full w-full object-cover"
            src={userData?.avatar}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-2 text-zinc-500 z-[999999]">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          const content = (
            <MenuItem
              onClick={
                isLastItem
                  ? () => signOut({ callbackUrl: "/login" })
                  : closeMenu
              }
              className={`flex items-center gap-2 rounded hover:bg-[var(--color-base-300)] mr-8 ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal my-3"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );

          return isLastItem ? (
            <div key={label}>{content}</div>
          ) : (
            <Link href={link} key={label}>
              {content}
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}
