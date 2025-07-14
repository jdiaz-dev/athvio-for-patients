import { gql } from '@apollo/client';

export const GET_CHAT_QUERY = gql`
  query _getChat($chat: GetChatDto!) {
    getChat(chat: $chat) {
      uuid
      professional
      patient
      comments {
        uuid
        commenter
        content
        createdAt
      }
    }
  }
`;
export const SAVE_CHAT_COMMENT = gql`
  mutation _saveChatCommentDto($input: SaveChatCommentDto!) {
    saveChatComment(input: $input) {
      uuid
      patient
      comments {
        uuid
        commenter
        content
        createdAt
      }
    }
  }
`;

export const PROFESSIONAL_MESSAGED_SUBSCRIPTION = gql`
  subscription _professionalMessaged($input: SubscribePublishedMessageDto!) {
    professionalMessaged(input: $input) {
      uuid
      patient
      comments {
        uuid
        commenter
        content
        createdAt
      }
    }
  }
`;
