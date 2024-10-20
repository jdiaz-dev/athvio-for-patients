import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import {
  CommendAddedSubscriptionInput,
  CommendAddedSubscriptionRequest,
  CommentAddedResponse,
  GetChatInput,
  GetChatRequest,
  GetChatResponse,
  SaveChatInput,
  SaveChatRequest,
  SaveChatResponse,
} from 'src/modules/chat/adapters/out/chat.d';
import * as ChatSlice from 'src/modules/chat/adapters/in/slicers/ChatSlice';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import { PROFESSIONAL_MESSAGED_SUBSCRIPTION, GET_CHAT_QUERY, SAVE_CHAT_COMMENT } from 'src/modules/chat/adapters/out/chatQueries';

export function useChat() {
  const dispatch = useDispatch();

  const getChat = async (body: GetChatInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<GetChatResponse, GetChatRequest>({
        mutation: GET_CHAT_QUERY,
        variables: {
          chat: { ...body },
        },
      });
      if (response.data) dispatch(ChatSlice.acceptNewPatientChat(response.data.getChat));
    } catch (error) {
      dispatch(ChatSlice.addChatCommentFailure((error as ApolloError).graphQLErrors[0].message));
    }
  };

  const saveChatComment = async (body: SaveChatInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<SaveChatResponse, SaveChatRequest>({
        mutation: SAVE_CHAT_COMMENT,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(ChatSlice.removeLastCommentSavedInRedux());
        dispatch(ChatSlice.newCommentReceived(response.data.saveChatComment.comments[0]));
      }
    } catch (error) {
      dispatch(ChatSlice.addChatCommentFailure((error as ApolloError).graphQLErrors[0].message));
    }
  };

  const commentAddedSubscription = async (body: CommendAddedSubscriptionInput): Promise<void> => {
    console.log('-----------body subs', body);
    try {
      const response = apolloClient
        .subscribe<CommentAddedResponse, CommendAddedSubscriptionRequest>({
          query: PROFESSIONAL_MESSAGED_SUBSCRIPTION,
          variables: {
            input: body,
          },
        })
        .subscribe(({ data, errors, extensions }) => {
          console.log('-------data', data);
          if (data) dispatch(ChatSlice.newCommentReceived(data.professionalMessaged.comments[0]));
        });

      if (response) {
        console.log('-------response', response);
        // dispatch(PatientPlanSlice.acceptNewPatientPlan(response.?.updatePlanMeal as PatientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getChat, saveChatComment, commentAddedSubscription };
}
