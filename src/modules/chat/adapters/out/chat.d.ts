import { Commenter } from "src/modules/chat/adapters/out/chat.enum";

export type CommentBody = {
  uuid: string;
  commenter: Commenter;
  content: string;
  createdAt: string;
};

export type ChatBody = {
  uuid: string;
  professional: string;
  patient: string;
  comments: CommentBody[];
};

export type GetChatInput = {
  professional: string;
  patient: string;
};

export type GetChatRequest = {
  chat: GetChatInput;
};

export type GetChatResponse = {
  getChat: ChatBody;
};

export type ChatInitialState = {
  chat: { data: ChatBody; loading: boolean; error: string | null };
};

export type CommendAddedSubscriptionInput = GetChatInput;
export type CommendAddedSubscriptionRequest = {
  input: CommendAddedSubscriptionInput;
};

export type CommentAddedResponse = {
  professionalMessaged: Omit<ChatBody, 'professional'>;
};

export type GetChatInput = {
  professional: string;
  patient: string;
};

export type GetChatRequest = {
  chat: GetChatInput;
};

export type GetChatResponse = {
  getChat: ChatBody;
};

export type SaveChatInput = {
  patient: string;
  comment: Pick<CommentBody, 'commenter' | 'content'>;
};

export type SaveChatRequest = {
  input: SaveChatInput;
};

export type SaveChatResponse = {
  saveChatComment: ChatBody;
};