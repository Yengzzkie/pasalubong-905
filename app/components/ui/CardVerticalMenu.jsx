"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function CardVerticalMenu({ data, setIsOpen }) {
  const session = useSession();
  const isAuthor = session?.data?.user?.id === data.authorId;

  async function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <IconButton>
        {isAuthor ? (
          <DeleteIcon onClick={openModal} className="!text-[var(--color-primary-content)]" />
        ) : (
          <FavoriteBorderIcon className="!text-[var(--color-primary-content)]" />
        )}
      </IconButton>
    </div>
  );
}
