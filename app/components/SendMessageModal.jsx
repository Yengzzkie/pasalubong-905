import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useOpenSendMessage } from "@/stores/store";

export default function SendMessageModal({ data, setOpenToast, openMessageDialog, setOpenMessageDialog }) {
  const session = useSession();
  const { openSendMessage, setOpenSendMessage } = useOpenSendMessage();
  const [message, setMessage] = React.useState("");
  const currentUserId = session?.data?.user?.id;
  const authorId = data?.author?.id;

  const handleClose = () => {
    setOpenSendMessage(false); // global state handler for sendMessageModal, used in DragCloseDrawer
    if (openMessageDialog) {
      setOpenMessageDialog(false); // open state handler for sendMessageModal, used in item-details page
    };
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }
    try {
      const participantIds = [currentUserId, authorId];
      const conversationId = await axios.post("/api/conversations", { postId: data.id, participantIds });

      await axios.post("/api/messages", {
        conversationId: conversationId.data.id,
        senderId: currentUserId,
        content: message,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      return;
    } finally {
      setOpenToast(true);
    }

    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog open={openSendMessage || openMessageDialog} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Send Message</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              You're about to send a message to <strong>{data?.author?.name}</strong>. Please type your message below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="message"
              label="Your Message"
              type="text"
              fullWidth
              multiline
              minRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! Is this item still available?"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: "var(--color-error-content)", "&:hover": { background: "var(--color-error)" } }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ background: "var(--color-primary-content)", "&:hover": { background: "var(--color-primary)", color: "var(--color-primary-content)" } }}>
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
