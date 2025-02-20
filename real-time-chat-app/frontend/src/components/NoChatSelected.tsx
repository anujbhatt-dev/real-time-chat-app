import { MessageCircle } from "lucide-react";

const NoChatSelected = () => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="h-[20rem] w-[25rem]  shadow-lg bg-base-100 flex justify-center items-center text-center space-y-4 p-6 rounded-lg">
        <div className="text-center space-y-4 p-6x">
          <div className="text-6xl text-primary m-auto inline-block p-2 bg-base-300 rounded-lg">
             <MessageCircle className="text-blue-500" size={32}/>
          </div>
          <h2 className="text-2xl font-bold0">No Chat Selected</h2>
          <p className="opacity-30">Choose a conversation to start messaging.</p>
        </div>
        </div>
      </div>
    );
  };
  
  export default NoChatSelected;
  