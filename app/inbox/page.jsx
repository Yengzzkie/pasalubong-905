"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  Avatar,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import { useSession } from "next-auth/react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Loader from "../components/ui/Loader";
import Link from "next/link";

export default function InboxPage() {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const otherParticipant = selectedConversation?.participants?.find(
    (p) => p.user?.id !== currentUserId
  );
  const otherUserName = otherParticipant?.user?.name || "Deleted User";

  useEffect(() => {
    // Fetch conversations only when session is loaded
    if (!currentUserId) return;

    const fetchConversations = async () => {
      try {
        const response = await axios.get(`/api/conversations/user?userId=${currentUserId}`);
        setConversations(response.data);
      } catch (err) {
        console.error("Failed to fetch conversations", err);
      }
    };

    fetchConversations();
  }, [currentUserId]);

  // Load messages for the selected conversation
  const loadMessages = async (conversation) => {
    setSelectedConversation(conversation);
    setLoadingMessages(true);

    try {
      // Fetch updated messages and mark them as read
      await axios.put(`/api/conversations/${conversation.id}/messages`);
      const response = await axios.get(
        `/api/conversations/${conversation.id}/messages`
      );
      setMessages(response.data);

      // Refresh the conversations to update read status (remove red dot)
      const updatedConversations = await axios.get(
        `/api/conversations/user?userId=${currentUserId}`
      );
      setConversations(updatedConversations.data);
    } catch (err) {
      console.error("Failed to fetch or update messages", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    try {
      const response = await axios.post("/api/messages", {
        conversationId: selectedConversation.id,
        senderId: currentUserId,
        content: messageText,
      });

      setMessages((prev) => [...prev, response.data]);
      setMessageText("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <Box display="flex" height="80vh" border="1px solid #ccc" overflow="hidden">
      {/* Sidebar */}
      <Box width="30%" bgcolor="#f5f5f5" overflow="auto">
        <Typography variant="h6" px={2} py={2}>
          Inbox
        </Typography>
        <Divider />
        <List>
          {conversations.map((conv) => {
            const otherUser = conv.conversation?.participants?.find(
              (p) => p.user?.id !== currentUserId
            );

            return (
              <ListItemButton
                key={conv.id}
                onClick={() => loadMessages(conv.conversation)}
                selected={selectedConversation?.id === conv.id}
              >
                {/* other user's avatar and name */}
                <Avatar
                  src={conv.conversation?.post?.image[0]}
                  sx={{
                    width: { xs: 30, sm: 40 },
                    height: { xs: 30, sm: 40 },
                    mr: 1.5,
                  }}
                />
                <Box>
                  {/* unread message indicator */}
                  {conv.conversation?.messages?.length > 0 &&
                  !conv.conversation?.messages?.[
                    conv.conversation?.messages?.length - 1
                  ]?.read ? (
                    <div className="bg-red-500 rounded-full w-1.5 h-1.5"> </div>
                  ) : null}

                  {/* other user's name */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: { xs: ".8rem", sm: "1rem" } }}
                    noWrap
                  >
                    {otherUser?.user?.name || "Deleted User"}
                  </Typography>

                  {/* last message preview */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: ".8rem" }}
                    noWrap
                  >
                    {conv.conversation?.messages?.[
                      conv.conversation.messages.length - 1
                    ]?.content || "No messages yet"}
                  </Typography>
                </Box>
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* Conversation View */}
      <Box flex={1} display="flex" flexDirection="column" bgcolor="#fff">
        {selectedConversation ? (
          <>
            {/* Header with other user's name which also links to item-details page */}
            <Link href={`/item-details/${selectedConversation.post?.id}`}>
              <div className="flex items-center gap-2 p-4 border-b">
                <img
                  src={selectedConversation.post?.image[0]}
                  alt="post-image"
                  className="w-20 h-20"
                />
                <div className="flex flex-col ml-2">
                  {/* post title */}
                  <h2 className="text-lg font-semibold">
                    {selectedConversation.post?.title}
                  </h2>

                  {/* other user's name */}
                  <h1 className="text-sm text-zinc-600">
                    Chatting with{" "}
                    {otherUserName}
                  </h1>
                </div>
              </div>
            </Link>

            <Box px={1} borderBottom="1px solid #ddd">
              <Typography variant="h6">
                {
                  selectedConversation.participants.find(
                    (p) => p.id !== currentUserId
                  )?.name
                }
              </Typography>
            </Box>
            <Box flex={1} p={2} overflow="auto">
              {loadingMessages ? (
                <Loader />
              ) : (
                messages.map((msg) => (
                  <Box
                    key={msg.id}
                    display="flex"
                    justifyContent={
                      msg.senderId === currentUserId ? "flex-end" : "flex-start"
                    }
                    mb={{ xs: 2, sm: 1 }}
                  >
                    <div className="flex gap-1 lg:max-w-[70%]">
                      {msg.senderId !== currentUserId && (
                        <Link href={`/user/${msg.senderId}`}>
                          <Avatar
                            src={msg.sender.avatar}
                            sx={{ width: 40, height: 40 }}
                          />
                        </Link>
                      )}
                      <div>
                        <Box
                          px={2}
                          py={1}
                          bgcolor={
                            msg.senderId === currentUserId ? "#1976d2" : "#eee"
                          }
                          color={
                            msg.senderId === currentUserId ? "#fff" : "#000"
                          }
                          borderRadius="12px"
                          width="100%"
                        >
                          <Typography variant="body2">{msg.content}</Typography>
                        </Box>
                        <p className="text-xs text-gray-500 px-1">
                          Sent {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Box>
                ))
              )}
            </Box>
            <Box
              p={2}
              borderTop="1px solid #ddd"
              display="flex"
              alignItems="center"
            >
              <TextField
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                fullWidth
                placeholder="Type a message..."
                size="small"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent form submission
                    handleSendMessage();
                  }
                }}
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body1" color="text.secondary">
              Select a conversation
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
