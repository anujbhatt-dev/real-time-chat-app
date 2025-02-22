import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect, useRef } from 'react';

function Message() {
  const { messages, subscripbeToNewMessage, unsubscripbeToNewMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    subscripbeToNewMessage();

    return () => {
      unsubscripbeToNewMessage();
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the message container when messages change
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  if (messages?.length === 0)
    return (
      <div className='h-full flex justify-center items-center font-semibold text-[1rem]'>
        No conversation yet
      </div>
    );

  return (
    <div className='pb-[2rem] message'>
      {/* Container for the messages with scroll enabled */}
      <div
        ref={messageContainerRef}
        className='min-h-[600px] overflow-y-auto'  // Add this style for scrollable container
      >
        {messages?.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}
          >
            <div className='chat-image avatar'>
              <div className='w-10 rounded-full'>
                <img
                  alt='Tailwind CSS chat bubble component'
                  src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                />
              </div>
            </div>
            <div className='chat-header'>
              <time className='text-xs opacity-50'>
                {new Date(message.createdAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </time>
            </div>
            <div className='chat-bubble'>
              {message.text}
              {message.image && (
                <div className='mt-2'>
                  <img
                    src={message.image}
                    alt='Message Image'
                    className='max-w-full max-h-[15rem] rounded-lg'
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Add a div at the bottom to help with scrolling to the last message */}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
}

export default Message;
