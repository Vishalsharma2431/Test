import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import {WebView} from 'react-native-webview';

const {width, height} = Dimensions.get('window');

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
          <title>Response</title>
        </head>
        <body>
          <h1>Server Response</h1>
          <p>You sent: ${inputText}</p>

          <!-- Video element -->
          <video width="100%" controls>
            <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>

          <!-- Audio element -->
          <audio controls>
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3">
            Your browser does not support the audio element.
          </audio>
        </body>
      </html>
    `,
    },
  ]);

  const sendData = () => {
    if (inputText.trim() === '') return;

    setMessages(prevMessages => [
      ...prevMessages,
      {id: `${Math.random()}`, type: 'text', content: inputText},
    ]);

    const responseHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Response</title>
        </head>
        <body>
          <h1>Server Response</h1>
          <p>You sent: ${inputText}</p>

          <!-- Video element -->
          <video width="100%" controls>
            <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>

          <!-- Audio element -->
          <audio controls>
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3">
            Your browser does not support the audio element.
          </audio>
        </body>
      </html>
    `;

    setMessages(prevMessages => [
      ...prevMessages,
      {id: `${Math.random()}`, type: 'html', content: responseHtml},
    ]);

    setInputText('');
  };

  const renderItem = ({item}) => {
    if (item.type === 'text') {
      return (
        <View style={[styles.messageContainer, styles.sentMessage]}>
          <Text style={styles.textMessage}>{item.content}</Text>
        </View>
      );
    } else if (item.type === 'html') {
      return (
        <View style={styles.webviewContainer}>
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    padding: 10,
    paddingBottom: 100,
  },
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
  textMessage: {
    fontSize: 16,
    color: '#000',
  },
  webviewContainer: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  webview: {
    height: height * 0.5,
    width: width * 0.9,
  },
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
