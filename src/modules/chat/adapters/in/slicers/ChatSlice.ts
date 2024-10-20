import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { chatIntialState } from 'src/modules/chat/adapters/in/slicers/ChatInitialState';
import { ChatBody, CommentBody } from 'src/modules/chat/adapters/out/chat';

export const addChatCommentFailure = createAction<string>('addChatCommentFailure');

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatIntialState,
  reducers: {
    acceptNewPatientChat: (state, action: PayloadAction<ChatBody>) => {
      state.chat.data = action.payload;
      return state;
    },
    removeLastCommentSavedInRedux(state){
      state.chat.data.comments.pop()
      return state
    },
    newCommentReceived: (state, action: PayloadAction<CommentBody>) => {
      state.chat.data.comments.push(action.payload);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addChatCommentFailure, (state, action) => {
      state.chat.loading = false;
      state.chat.error = action.payload;
    });
  },
});

export const { acceptNewPatientChat, removeLastCommentSavedInRedux, newCommentReceived } = chatSlice.actions;

export default chatSlice.reducer;
