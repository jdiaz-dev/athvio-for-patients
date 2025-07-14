import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { TextInput, List, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/auth/adapters/in/context/AuthContext';
import { useChat } from 'src/modules/chat/adapters/out/ChatActions';
import { CommentBody } from 'src/modules/chat/adapters/out/chat';
import { Commenter } from 'src/modules/chat/adapters/out/chat.enum';
import { ReduxStates } from 'src/shared/types/types';
import * as ChatSlice from 'src/modules/chat/adapters/in/slicers/ChatSlice';

const ChatScreen = () => {
  const { patient, assignedProfessional } = useContext(AuthContext);
  const dispatch = useDispatch();

  const { getChat, commentAddedSubscription, saveChatComment } = useChat();
  const { data: chatState } = useSelector((state: ReduxStates) => state.chat.chat);

  const [currentMessage, setCurrentMessage] = useState<string>('');

  useEffect(() => {
    const chatManagerHelper = async () => {
      const data = {
        professional: assignedProfessional,
        patient: patient as string,
      };
      await getChat(data);
      commentAddedSubscription(data);
    };
    if (patient !== null) {
      chatManagerHelper();
    }
  }, [patient]);

  const sendMessageHandler = async () => {
    if (patient !== null && currentMessage.trim()) {
      setCurrentMessage('');
      const comment = {
        uuid: '',
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

  const renderItem: ListRenderItem<CommentBody> = ({ item }) => {
    return (
      <>
        <Text variant="labelLarge" style={{ textAlign: 'center', color: 'white' }}>
          {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
        </Text>
        <List.Item
          title={item.content}
          titleStyle={item.commenter === Commenter.PATIENT ? styles.patientMessage : styles.professionalMessage}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatState ? chatState.comments : []}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.messageBoxContainer}>
        <TextInput
          label="Send a message"
          value={currentMessage}
          onChangeText={(text) => setCurrentMessage(text)}
          style={styles.textInput}
          textColor="white"
        />
        <IconButton icon="send" size={30} onPress={sendMessageHandler} style={styles.sendButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: '#121212', // Dark background
  },
  chatContainer: {
    padding: 10,
  },
  messageBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 25,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    fontSize: 16,
    padding: 5,
  },
  sendButton: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  patientMessage: {
    backgroundColor: '#2b8a7f',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  professionalMessage: {
    backgroundColor: '#292929',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
});

export default ChatScreen;
