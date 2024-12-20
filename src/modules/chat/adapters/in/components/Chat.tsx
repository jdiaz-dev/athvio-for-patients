import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { TextInput, Button, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { useChat } from 'src/modules/chat/adapters/out/ChatActions';
import { CommentBody } from 'src/modules/chat/adapters/out/chat';
import { Commenter } from 'src/modules/chat/adapters/out/chat.enum';
import { ReduxStates } from 'src/shared/types/types';
import * as ChatSlice from 'src/modules/chat/adapters/in/slicers/ChatSlice';

interface Message {
  id: string;
  text: string;
  sender: 'patient' | 'nutritionist';
}

const ChatScreen = () => {
  const { patient, assignedProfessional } = useContext(AuthContext);
  const dispatch = useDispatch();

  const { getChat, commentAddedSubscription, saveChatComment } = useChat();
  const { data: chatState } = useSelector((state: ReduxStates) => state.chat.chat);

  const [currentMessage, setCurrentMessage] = useState<string>('');

  const data = {
    professional: assignedProfessional,
    patient,
  };
  useEffect(() => {
    const getChatHelper = async () => {
      await getChat(data);
    };
    getChatHelper();
    commentAddedSubscription(data);
  }, []);

  const sendMessageHandler = async () => {
    if (currentMessage.trim()) {
      setCurrentMessage('');
      const comment = {
        _id: '',
        commenter: Commenter.PATIENT,
        content: currentMessage.trim(),
        createdAt: new Date().toISOString(),
      };
      dispatch(ChatSlice.newCommentReceived(comment));
      await saveChatComment({
        patient,
        comment: {
          commenter: comment.commenter,
          content: comment.content,
        },
      });
    }
  };

  const renderItem: ListRenderItem<CommentBody> = ({ item }) => (
    <List.Item
      title={item.content}
      titleStyle={item.commenter === Commenter.PATIENT ? styles.patientMessage : styles.professionalMessage}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatState ? chatState.comments : []}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          label="Type a message"
          value={currentMessage}
          onChangeText={(text) => setCurrentMessage(text)}
          style={styles.input}
        />
        <Button mode="contained" onPress={sendMessageHandler} style={styles.sendButton}>
          Send
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatContainer: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: 'center',
  },
  patientMessage: {
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  professionalMessage: {
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
});

export default ChatScreen;
