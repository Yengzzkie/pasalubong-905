import * as React from "react";
import { deleteImages } from "@/lib/deleteImages";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteModal({ data, isOpen, setIsOpen, onDelete }) {

  const handleClose = () => {
    setIsOpen(false);
  };

  async function deletePost() {
    try {
      await deleteImages(data.image, data.authorId); // delete the images from the database first
      await axios.delete(`/api/posts/post?postId=${data?.id}`); // then delete the post
    } catch (error) {
      console.error({ error });
    } finally {
      onDelete(); // refetch posts after successful deletion
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete post?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this post? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={deletePost} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}