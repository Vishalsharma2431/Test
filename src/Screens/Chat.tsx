import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
} from 'react-native';
import {WebView} from 'react-native-webview';

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'html',
      content: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Welcome</title>
        </head>
        <body>
          <h1>Hello from WebView</h1>
          <p>This is the initial HTML content rendered in WebView.</p>
        </body>
      </html>
    `,
    },
  ]);

  const sendData = () => {
    if (inputText.trim() === '') return;

    // Add the user's message
    setMessages(prevMessages => [
      ...prevMessages,
      {id: `${Math.random()}`, type: 'text', content: inputText},
    ]);

    // Simulate a response from the server (HTML content)
    const responseHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Response</title>
        </head>
        <body>
          <h1>Server Response</h1>
          <p>You sent: ${inputText}</p>
        </body>
      </html>
    `;

    setMessages(prevMessages => [
      ...prevMessages,
      {id: `${Math.random()}`, type: 'html', content: responseHtml},
    ]);

    setInputText(''); // Clear the input field
  };

  const renderItem = ({item}) => {
    if (item.type === 'text') {
      // User's text message (aligned to right)
      return (
        <View style={[styles.messageContainer, styles.sentMessage]}>
          <Text style={styles.textMessage}>{item.content}</Text>
        </View>
      );
    } else if (item.type === 'html') {
      // HTML message (aligned to left)
      return (
        <View>
          <WebView
            style={styles.webview}
            originWhitelist={['*']}
            source={{html: item.content}}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  chatContainer: {padding: 10, paddingBottom: 100},
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#DCF8C5',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
  },
  textMessage: {fontSize: 16, color: '#000'},
  webview: {height: 150, width: 300},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default Chat;
