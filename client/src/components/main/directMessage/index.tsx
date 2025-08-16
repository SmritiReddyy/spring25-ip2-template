import React from 'react';
import './index.css';
import useDirectMessage from '../../../hooks/useDirectMessage';
import ChatsListCard from './chatsListCard';
import UsersListPage from '../usersListPage';
import MessageCard from '../messageCard';

/**
 * DirectMessage component renders a page for direct messaging between users.
 * It includes a list of users and a chat window to send and receive messages.
 */
const DirectMessage = () => {
  const {
    selectedChat,
    chatToCreate,
    chats,
    newMessage,
    setNewMessage,
    showCreatePanel,
    setShowCreatePanel,
    handleSendMessage,
    handleChatSelect,
    handleUserSelect,
    handleCreateChat,
  } = useDirectMessage();

  return (
    <>
      <div className='create-panel'>
        <button
          className='custom-button'
          onClick={() => setShowCreatePanel(prevState => !prevState)}
        >
          {showCreatePanel ? 'Hide Create Chat Panel' : 'Start a Chat'}
        </button>
        {/* TODO: Task 3 - If the create panel should be displayed, display 
        a React fragment that contains:
        - A <p> tag displayed the user selected to create a chat with 
        - A button to create a new chat on click. Use the class name 'custom-button' for styling.
        - The UsersListPage component to display a list of users to select from and handle search 
          and selection functionality (component reuse!).
        */}
        {showCreatePanel && (
          <>
            <p>Selected user: {chatToCreate}</p>
            <button className='custom-button' onClick={handleCreateChat}>
              Create New Chat
            </button>
            <UsersListPage handleUserSelect={handleUserSelect} />
          </>
        )}
      </div>
      <div className='direct-message-container'>
        <div className='chats-list'>
          {/* Use a map to display each of the chats using the ChatsListCard component. 
          Make sure that each component has a _unique_ key. */}
          {chats.map(chat => (
            <ChatsListCard key={chat._id} chat={chat} handleChatSelect={handleChatSelect} />
          ))}
        </div>
        <div className='chat-container'>
          {selectedChat ? (
            <>
              <h2>Chat Participants: {selectedChat.participants.join(', ')}</h2>
              <div className='chat-messages'>
                {/* Use a map to display each of the messages in the selected chat. 
                There is a component you can reuse to display this (hint: check the global chat)! 
                Make sure that each component has a _unique_ key. */}
                {selectedChat.messages.map(message => (
                  <MessageCard key={message._id} message={message} />
                ))}
              </div>
              <div className='message-input'>
                {/* TODO: Task 3 - Create an input field to take in the message the user wants to
                send. Use the class name 'custom-input' for styling. */}
                <input
                  className='custom-input'
                  type='text'
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder='Type a message...'
                />

                <button className='custom-button' onClick={handleSendMessage}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <h2>Select a user to start chatting</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default DirectMessage;
