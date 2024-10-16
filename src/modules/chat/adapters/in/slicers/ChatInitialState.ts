import { ChatInitialState } from "src/modules/chat/adapters/out/chat";

export const chatIntialState: ChatInitialState = {
  chat: { data: { _id: '', professional: '', patient: '', comments: [] }, loading: false, error: null },
};
