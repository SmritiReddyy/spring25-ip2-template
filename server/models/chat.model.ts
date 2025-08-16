import mongoose, { Model } from 'mongoose';
import chatSchema from './schema/chat.schema';
import { Chat } from '../types/chat';

/**
 * Mongoose model for the Chat collection.
 */
// TODO: Task 3 - Create and export the `ChatModel` model. Refer to other model files for guidance.
const ChatModel: Model<Chat> = mongoose.model<Chat>('Chat', chatSchema);

export default ChatModel;
