"use client";
import React from "react";
import axios from "axios";
import Loader from "@/app/components/ui/Loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";

const page = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  async function fetchUserData() {
    try {
      const response = await axios.get(`/api/users/user?userId=${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="bg-[var(--color-base-200)]">
      <div className="bg-[var(--color-primary-content)] h-40 w-full"></div>
      <div className="flex justify-center items-center -mt-20">
        <Avatar
          src={user.avatar}
          sx={{ width: 150, height: 150, boxShadow: 4 }}
        />
      </div>
      <div className="flex flex-col items-start mt-4 p-10 min-h-[50vh]">
        <h1 className="text-xl font-bold">Details</h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <TextField
              label="Name"
              variant="outlined"
              value={user.name}
              margin="normal"
              sx={{ width: "300px" }}
              InputProps={{
                readOnly: true,
              }}
            />
            <button className="text-red-500 cursor-pointer">Edit</button>
          </div>
          <div className="flex items-center gap-4">
            <TextField
              label="Email"
              variant="outlined"
              value={user.email}
              margin="normal"
              sx={{ width: "300px" }}
              InputProps={{
                readOnly: true,
              }}
            />
            <button className="text-red-500 cursor-pointer">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
