import { Plus, Send, Text, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";

type Props = {};

function SendMessage({}: Props) {
  const { sendMessage } = useChatStore();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    if (!file.type.startsWith("image/")) {
      console.log("Please select an image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImage(reader.result as string); // setImage expects a string
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSend = () => {
    if (!message.trim() && !image) return;  // Prevent sending empty messages
    console.log(image);
    
    sendMessage(message, image ? image : "");
    setMessage(""); // Clear input after sending
    handleRemoveImage();
  };

  const handleRemoveImage = () => {
    setImage(null); // Remove the selected image
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear file input value
    }
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
      {image && (
        <div className="h-full p-2 relative">
          <img src={image} alt="Selected preview" className="h-full w-auto rounded" />
          <X
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 cursor-pointer bg-white rounded-full p-1 text-red-500"
          />
        </div>
      )}

      <div className="flex gap-x-6">
        <Send
          className="shadow-sm cursor-pointer"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          onClick={handleSend}
        />
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleImage} />
        <Plus onClick={() => fileInputRef.current?.click()} className="shadow-sm cursor-pointer" />
      </div>
    </div>
  );
}

export default SendMessage;
