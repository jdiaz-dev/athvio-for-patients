import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { TextInput, Button, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useChat } from 'src/modules/chat/adapters/out/ChatActions';
import { CommentBody } from 'src/modules/chat/adapters/out/chat';
import { Commenter } from 'src/modules/chat/adapters/out/chat.enum';
import { ReduxStates } from 'src/shared/types/types';

interface Message {
  id: string;
  text: string;
  sender: 'patient' | 'nutritionist';
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { getChat, commentAddedSubscription } = useChat();
  const { data: chatState } = useSelector((state: ReduxStates) => state.chat.chat);

  const [currentMessage, setCurrentMessage] = useState<string>('');

  const data = {
    professional: '6673734729a8ffa437766dac',
    patient: '66f34742ac2177ebd8ed770a',
  };
  useEffect(() => {
    const getChatHelper = async () => {
      await getChat(data);
    };
    getChatHelper();
    commentAddedSubscription(data);
  }, []);
  const sendMessageHandler = () => {
    if (currentMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, { id: Date.now().toString(), text: currentMessage, sender: 'patient' }]);
      setCurrentMessage('');
    }
  };

  const renderItem: ListRenderItem<CommentBody> = ({ item }) => (
    <List.Item
      title={item.content}
      titleStyle={item.commenter === Commenter.PATIENT ? styles.patientMessage : styles.otherMessage}
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
  otherMessage: {
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
});

export default ChatScreen;
