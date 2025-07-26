"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useOpenSendMessage } from "@/stores/store";
import { Box } from "@mui/material";
import { getRandomColor } from "@/lib/generateRandomColor";
import ScheduleFormModal from "./ScheduleFormModal";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { setOpenSendMessage } = useOpenSendMessage();

  // create new event
  const handleFormSubmit = (formData) => {
    const calendarApi = window.fullCalendarRef?.getApi();
    if (!calendarApi) return;

    const newEvent = calendarApi.addEvent({
      title: formData.title,
      start: formData.start,
      end: formData.end,
      allDay: formData.allDay,
      backgroundColor: getRandomColor(),
      textColor: "#fff",
    });
    setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleDateClick = (selected) => {
    setSelectedDate(selected)
    setOpenSendMessage(true);
  };

  // delete an event
  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  async function handleSaveEvent() {
    alert("Events saved")
  }

  return (
    <Box m="20px">
      <Box ml="15px">
        <FullCalendar
          ref={(el) => (window.fullCalendarRef = el)}
          height="75vh"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventsSet={(events) => setCurrentEvents(events)}
          initialEvents={[]}
        />
        <ScheduleFormModal selectedDate={selectedDate} onSubmit={handleFormSubmit} />
        <Button sx={{ color: "#fff", background: "#155dfc", "&:hover": { background: "#2b7fff" }, mt: 1 }} onClick={() => handleSaveEvent(true)}>Save schedule</Button>
      </Box>
    </Box>
  );
};

export default Calendar;
