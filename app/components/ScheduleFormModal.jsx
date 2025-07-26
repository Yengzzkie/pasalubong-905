import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useOpenSendMessage } from "@/stores/store";

export default function ScheduleFormModal({ selectedDate, onSubmit }) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("20:00");
  const [allDay, setAllDay] = useState(false);

  const { openSendMessage, setOpenSendMessage } = useOpenSendMessage();

  const handleClose = () => {
    setOpenSendMessage(false);
    setTitle("");
    setStartTime("09:00");
    setEndTime("20:00");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      start: `${selectedDate.dateStr}T${startTime}`,
      end: `${selectedDate.dateStr}T${endTime}`,
      allDay: false
    };

    onSubmit(formData); // Send the form data back to the parent
    handleClose();      // Close the modal after submission
  };

  return (
    <Dialog open={openSendMessage} onClose={handleClose}>
      <DialogTitle>Add Schedule</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Start Time"
            type="time"
            fullWidth
            variant="standard"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="End Time"
            type="time"
            fullWidth
            variant="standard"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
