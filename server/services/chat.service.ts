import ChatModel from '../models/chat.model';
import MessageModel from '../models/messages.model';
import UserModel from '../models/users.model';
import { Chat, ChatResponse, CreateChatPayload } from '../types/chat';
import { Message, MessageResponse } from '../types/message';

/**
 * Creates and saves a new chat document in the database, saving messages dynamically.
 *
 * @param chat - The chat object to be saved, including full message objects.
 * @returns {Promise<ChatResponse>} - Resolves with the saved chat or an error message.
 */
export const saveChat = async (chatPayload: CreateChatPayload): Promise<ChatResponse> => {
  // TODO: Task 3 - Implement the saveChat function. Refer to other service files for guidance.
  try {
    // Convert message payloads to saved message IDs
    const messageIds = await Promise.all(
      chatPayload.messages.map(async msg => {
        const savedMessage = await MessageModel.create(msg);
        return savedMessage._id;
      }),
    );

    // Create the chat using participant IDs and saved message IDs
    const result = await ChatModel.create({
      participants: chatPayload.participants,
      messages: messageIds,
    });

    return result;
  } catch (error) {
    return { error: `Error saving chat: ${error}` };
  }
};

/**
 * Creates and saves a new message document in the database.
 * @param messageData - The message data to be created.
 * @returns {Promise<MessageResponse>} - Resolves with the created message or an error message.
 */
export const createMessage = async (messageData: Message): Promise<MessageResponse> => {
  // TODO: Task 3 - Implement the createMessage function. Refer to other service files for guidance.

  try {
    const user = await UserModel.findOne({ username: messageData.msgFrom });
    if (!user) {
      throw new Error('Message sender is invalid or does not exist.');
    }

    const result = await MessageModel.create(messageData);
    return result;
  } catch (error) {
    return { error: `Error creating message: ${error}` };
  }
};

/**
 * Adds a message ID to an existing chat.
 * @param chatId - The ID of the chat to update.
 * @param messageId - The ID of the message to add to the chat.
 * @returns {Promise<ChatResponse>} - Resolves with the updated chat object or an error message.
 */
export const addMessageToChat = async (chatId: string, messageId: string): Promise<ChatResponse> =>
  // TODO: Task 3 - Implement the addMessageToChat function. Refer to other service files for guidance.
  {
    try {
      const updatedChat = await ChatModel.findByIdAndUpdate(
        chatId,
        { $push: { messages: messageId } },
        { new: true },
      );

      if (!updatedChat) {
        throw new Error('Chat not found');
      }
      return updatedChat;
    } catch (error) {
      return { error: `Error adding message to chat: ${error}` };
    }
  };

/**
 * Retrieves a chat document by its ID.
 * @param chatId - The ID of the chat to retrieve.
 * @returns {Promise<ChatResponse>} - Resolves with the found chat object or an error message.
 */
export const getChat = async (chatId: string): Promise<ChatResponse> =>
  // TODO: Task 3 - Implement the getChat function. Refer to other service files for guidance.
  {
    try {
      const chat = await ChatModel.findById(chatId);
      if (!chat) {
        throw new Error('Chat not found');
      }
      return chat;
    } catch (error) {
      return { error: `Error retrieving chat: ${error}` };
    }
  };

/**
 * Retrieves chats that include all the provided participants.
 * @param p An array of participant usernames to match in the chat's participants.
 * @returns {Promise<Chat[]>} A promise that resolves to an array of chats where the participants match.
 * If no chats are found or an error occurs, the promise resolves to an empty array.
 */
export const getChatsByParticipants = async (p: string[]): Promise<Chat[]> =>
  // TODO: Task 3 - Implement the getChatsByParticipants function. Refer to other service files for guidance.
  {
    try {
      const chats = await ChatModel.find({ participants: { $all: p } }).lean();

      if (!chats) {
        throw new Error('Chat not found with the provided participants');
      }

      return chats;
    } catch (error) {
      return [];
    }
  };

/**
 * Adds a participant to an existing chat.
 *
 * @param chatId - The ID of the chat to update.
 * @param userId - The ID of the user to add to the chat.
 * @returns {Promise<ChatResponse>} - Resolves with the updated chat object or an error message.
 */
export const addParticipantToChat = async (chatId: string, userId: string): Promise<ChatResponse> =>
  // TODO: Task 3 - Implement the addParticipantToChat function. Refer to other service files for guidance.
  {
    try {
      // Validate if user exists
      const userExists = await UserModel.findById(userId);
      if (!userExists) {
        throw new Error('User does not exist.');
      }

      // Add participant if not already in the chat
      const updatedChat = await ChatModel.findOneAndUpdate(
        { _id: chatId, participants: { $ne: userId } }, // Ensure user is not already a participant
        { $push: { participants: userId } },
        { new: true }, // Return the updated document
      );

      if (!updatedChat) {
        throw new Error('Chat not found or user already a participant.');
      }

      return updatedChat;
    } catch (error) {
      return { error: `Error adding participant to chat: ${(error as Error).message}` };
    }
  };
