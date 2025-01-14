import React, { useState, useEffect } from 'react';
import { IoChatbubblesOutline, IoSend } from 'react-icons/io5';
import { Box, Button } from '@radix-ui/themes';

function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Simulate a delay for the typing indicator
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1500);

    return () => clearTimeout(typingTimeout);
  }, [messages]);

  const handleOpenChatbot = () => {
    setIsChatOpen(true);
  };

  const handleCloseChatbot = () => {
    setIsChatOpen(false);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    setMessages([...messages, { text: message, sender: 'user' }]);
    setMessage('');
    setIsTyping(true); // Show typing indicator
    // Implement your logic to send message to chatbot
  };

  return (
    <div>
      {/* Floating chat window */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-8 z-50">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-80">
            <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-t-lg">
              <h2 className="text-lg font-semibold text-gray-800">Tips with Chatbot</h2>
              <button
                onClick={handleCloseChatbot}
                className="text-gray-600 hover:text-gray-800 cursor-pointer focus:outline-none"
              >
                <IoChatbubblesOutline className="text-xl inline mr-1" />
                Close Chat
              </button>
            </div>
            <div className="p-4 h-48 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex justify-center p-2 ${
                    msg.sender === 'user' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`bg-gray-100 rounded-full py-1 px-2 border border-gray-200 max-w-[80%] ${
                      msg.sender === 'user' ? 'bg-indigo-200 border-indigo-400' : ''
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-sm text-gray-500 text-right">Typing...</div>}
            </div>
            <div className="flex items-center px-4 py-2 border-t border-gray-200">
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Chat here..."
                className="flex-grow mr-2 border-none focus:ring-0"
              />
              <Button onClick={handleSendMessage} className="cursor-pointer">
                <IoSend />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button for chatbot */}
      <div className="fixed bottom-8 right-8 z-10">
        <button
          className="bg-[#3859C7] cursor-pointer text-white py-2 px-4 rounded-full shadow-md flex items-center justify-center"
          onClick={handleOpenChatbot}
        >
          <IoChatbubblesOutline className="mr-2 text-lg" />
          Tips with chatbot
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
