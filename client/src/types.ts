import { Socket } from 'socket.io-client';

// export type FakeSOSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
export type FakeSOSocket = SocketIOClient.Socket;

/**
 * Represents the credentials required for user authentication (login or signup).
 */
export interface UserCredentials {
  username: string;
  password: string;
}

/**
 * Represents a user in the application.
 */
export interface User {
  _id?: string;
  username: string;
  dateJoined: Date;
  biography: string;
}

/**
 * Enum representing the possible ordering options for questions.
 * and their display names.
 */
export const orderTypeDisplayName = {
  newest: 'Newest',
  unanswered: 'Unanswered',
  active: 'Active',
  mostViewed: 'Most Viewed',
} as const;

/**
 * Type representing the keys of the orderTypeDisplayName object.
 * This type can be used to restrict values to the defined order types.
 */
export type OrderType = keyof typeof orderTypeDisplayName;

/**
 * Interface represents a comment.
 *
 * text - The text of the comment.
 * commentBy - Username of the author of the comment.
 * commentDateTime - Time at which the comment was created.
 */
export interface Comment {
  text: string;
  commentBy: string;
  commentDateTime: Date;
}

/**
 * Interface representing a tag associated with a question.
 *
 * @property name - The name of the tag.
 * @property description - A description of the tag.
 */
export interface Tag {
  _id?: string;
  name: string;
  description: string;
}

/**
 * Interface represents the data for a tag.
 *
 * name - The name of the tag.
 * qcnt - The number of questions associated with the tag.
 */
export interface TagData {
  name: string;
  qcnt: number;
}

/**
 * Interface representing the voting data for a question, which contains:
 * - qid - The ID of the question being voted on
 * - upVotes - An array of user IDs who upvoted the question
 * - downVotes - An array of user IDs who downvoted the question
 */
export interface VoteData {
  qid: string;
  upVotes: string[];
  downVotes: string[];
}

/**
 * Interface representing an Answer document, which contains:
 * - _id - The unique identifier for the answer. Optional field
 * - text - The content of the answer
 * - ansBy - The username of the user who wrote the answer
 * - ansDateTime - The date and time when the answer was created
 * - comments - Comments associated with the answer.
 */
export interface Answer {
  _id?: string;
  text: string;
  ansBy: string;
  ansDateTime: Date;
  comments: Comment[];
}

/**
 * Interface representing the structure of a Question object.
 *
 * - _id - The unique identifier for the question.
 * - tags - An array of tags associated with the question, each containing a name and description.
 * - answers - An array of answers to the question
 * - title - The title of the question.
 * - views - An array of usernames who viewed the question.
 * - text - The content of the question.
 * - askedBy - The username of the user who asked the question.
 * - askDateTime - The date and time when the question was asked.
 * - upVotes - An array of usernames who upvoted the question.
 * - downVotes - An array of usernames who downvoted the question.
 * - comments - Comments associated with the question.
 */
export interface Question {
  _id?: string;
  tags: Tag[];
  answers: Answer[];
  title: string;
  views: string[];
  text: string;
  askedBy: string;
  askDateTime: Date;
  upVotes: string[];
  downVotes: string[];
  comments: Comment[];
}

/**
 * Interface representing a Message, which contains:
 * - _id - The unique identifier for the message. Optional field.
 * - msg - The text of the message.
 * - msgFrom - The username of the user sending the message.
 * - msgDateTime - The date and time when the message was sent.
 * - type - The type of message, either 'global' or 'direct'.
 */
export interface Message {
  _id?: string;
  msg: string;
  msgFrom: string;
  msgDateTime: Date;
  type: 'global' | 'direct';
}

/**
 * Interface representing the payload for a vote update socket event.
 */
export interface VoteUpdatePayload {
  qid: string;
  upVotes: string[];
  downVotes: string[];
}

/**
 * Interface representing the payload for an answer update event.
 */
export interface AnswerUpdatePayload {
  qid: string;
  answer: Answer;
}

/**
 * Interface representing the payload for a comment update event.
 * - result: The updated question or answer.
 * - type: The type of the entity being updated, either 'question' or 'answer'.
 */
export interface CommentUpdatePayload {
  result: Question | Answer;
  type: 'question' | 'answer';
}

/**
 * Interface representing the payload for a message update event, which contains:
 * - msg: The updated message.
 */
export interface MessageUpdatePayload {
  msg: Message;
}

/**
 * Interface representing the payload for a chat update event.
 */
export interface ChatUpdatePayload {
  chat: Chat;
  type: 'created' | 'newMessage';
}

/**
 * Interface representing the payload for a user update event, which contains:
 * - user: The updated user.
 * - type: The modification to the user (created or deleted).
 */
export interface UserUpdatePayload {
  user: User;
  type: 'created' | 'deleted';
}

/**
 * Interface representing a move in the Nim game.
 */
export interface NimMove {
  numObjects: number;
}

/**
 * Interface representing the state of a game.
 * - status: The current status of the game (waiting, in progress, or over).
 * - moves: The list of moves made in the game.
 * - remainingObjects: The number of objects left in the game.
 */
export interface GameState {
  status: 'WAITING_TO_START' | 'IN_PROGRESS' | 'OVER';
  moves: ReadonlyArray<NimMove>;
  player1?: string;
  player2?: string;
  winners?: string[];
  remainingObjects: number;
}

/**
 * Interface representing a game instance, including its state, players, and game type.
 */
export interface GameInstance {
  state: GameState;
  gameID: string;
  players: string[];
  gameType: GameType;
}

/**
 * Interface representing a game move, which contains the game ID and the move details.
 */
export interface GameMove {
  gameID: string;
  move: {
    playerID: string;
    gameID: string;
    move: {
      numObjects: number;
    };
  };
}

/**
 * Type representing the possible statuses of a game.
 */
export type GameStatus = 'IN_PROGRESS' | 'WAITING_TO_START' | 'OVER';

/**
 * Type representing the possible game types.
 */
export type GameType = 'Nim';

/**
 * Interface representing the payload for a game update event.
 */
export interface GameUpdatePayload {
  gameState: GameInstance;
}

/**
 * Interface representing the payload for a game error event.
 */
export interface GameErrorPayload {
  player: string;
  error: string;
}

/**
 * Extends the raw Message with an extra `user` field for
 * enriched user details (populated from `msgFrom`).
 */
export interface MessageInChat extends Message {
  user: {
    _id: string;
    username: string;
  } | null; // If user not found
}

/**
 * Represents a Chat with participants and messages (fully enriched).
 * participants is still an array of user ObjectIds.
 * messages is an array of MessageInChat objects.
 */
export interface Chat {
  _id?: string;
  participants: string[]; // array of user IDs
  messages: MessageInChat[]; // array of messages, each with user details
  createdAt?: Date; // set by Mongoose if timestamps: true
  updatedAt?: Date; // set by Mongoose if timestamps: true
}

/**
 * Interface representing the possible events that the server can emit to the client.
 */
export interface ServerToClientEvents {
  questionUpdate: (question: Question) => void;
  answerUpdate: (update: AnswerUpdatePayload) => void;
  viewsUpdate: (question: Question) => void;
  voteUpdate: (vote: VoteUpdatePayload) => void;
  commentUpdate: (update: CommentUpdatePayload) => void;
  messageUpdate: (message: MessageUpdatePayload) => void;
  userUpdate: (user: UserUpdatePayload) => void;
  gameUpdate: (game: GameUpdatePayload) => void;
  gameError: (error: GameErrorPayload) => void;
  chatUpdate: (chat: ChatUpdatePayload) => void;
}

/**
 * Interface representing the possible events that the client can emit to the server.
 */
export interface ClientToServerEvents {
  makeMove: (move: GameMove) => void;
  joinGame: (gameID: string) => void;
  leaveGame: (gameID: string) => void;
  joinChat: (chatID: string) => void;
  leaveChat: (chatID: string | undefined) => void;
}
