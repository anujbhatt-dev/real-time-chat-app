import { Plus, Send, Text } from "lucide-react";
import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";

type Props = {};

function SendMessage({}: Props) {
  const { sendMessage } = useChatStore();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return; // Prevent sending empty messages
    sendMessage(message);
    setMessage(""); // Clear input after sending
  };

  return (
    <div className="absolute bottom-0 h-[4rem] w-full bg-base-300 flex justify-between items-center gap-x-6 px-2">
      <label className="input input-bordered flex items-center gap-2 w-full">
        <Text />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="grow outline-none"
          placeholder="Text Here..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()} // Send on Enter key press
        />
      </label>
      <div className="flex gap-x-6">
        <Send className="shadow-sm cursor-pointer" onClick={handleSend} />
        <Plus className="shadow-sm cursor-pointer" />
      </div>
    </div>
  );
}

export default SendMessage;
