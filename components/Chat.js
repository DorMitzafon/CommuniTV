import React from 'react';
import { StyleSheet, View, Dimensions, TouchableHighlight, Text } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
// import Voice from 'react-native-voice';

let socket = io.connect('https://tvchatserverapp.herokuapp.com/');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const defaultMessages = [{
  _id: Math.round(Math.random() * 1000000),
  text: "You have joined the chat room.",
  createdAt: new Date(Date.now()),
  system: true,
}];


export default class Chat extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          messages: [],
        }
      // Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
      // Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
      // Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
      // Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
      this.userLogout = {
        _id: Math.round(Math.random() * 1000000),
        text: `${ this.props.name } has left the chat room`,
        createdAt: new Date(Date.now()),
        system: true,
      };

      this.userLogin = {
        _id: Math.round(Math.random() * 1000000),
        text: `${ this.props.name } has joined the chat room`,
        createdAt: new Date(Date.now()),
        system: true,
      };
      this._socketListener();
  }

  _socketListener() {
    if (this.props.socket === this.socketName) {
      return;
    }

    socket.on(this.props.socket, (messages) => {
      this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
      }));
    });

    this.socketName = this.props.socket;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.socket === this.props.socket) {
      return;
    }


    socket.emit(prevProps.socket, this.userLogout);
    socket.removeAllListeners(prevProps.socket);
    this._socketListener();
    this._startChat();
  }

  onSpeechPartialResults(e) {
    var message = [
      {
        _id: Math.round(Math.random() * 1000000)                                                                                                                                              ,
        text: e.value,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: this.props.name,
        },
      },
    ];

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
  }

  onSpeechEndHandler(data) {
    console.log('End data:', data);
  }
  
  onSpeechStartHandler(data) {
    console.log('Start data:', data);
  }

  onSpeechResultsHandler(e) {
    var message = [
      {
        _id: Math.round(Math.random() * 1000000)                                                                                                                                              ,
        text: e.value,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: this.props.name,
        },
      },
    ];

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
  }

  componentWillMount() {
    this._startChat();
  }

  _startChat() {
    if (!this.props.isActivated) {
      socket.emit(this.props.socket, [this.userLogin]);
    }

    this.setState({
      messages: defaultMessages
    });
  }

  onSend(messages = []) {
    console.log('onSend', this.props.socket);
    let sentMsg = JSON.parse(JSON.stringify(messages[0]));
    sentMsg.user._id = 2;
    sentMsg.user.name = this.props.name;
    socket.emit(this.props.socket, [sentMsg]);
    this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderInputToolBar = (props) => {
    return <InputToolbar {...props} containerStyle={styles.inputBar} accessoryStyle={styles.accessoryStyle}/>;
  }

  startRecording = async () => {
    // await Voice.start('en-US');
  }

  stopRecording = async () => {
    // var stopData = await Voice.stop();
    console.log('stop data:', stopData);
  }

  _startRecognizing = async () => {
    // try { 
    //   await Voice.start('en-US');
    // } catch (e) {
    //   console.error(e);
    // }
  }

  _stopRecognizing = async () => {
    // try {
    //   await Voice.stop();
    // } catch (e) {
    //   console.error(e);
    // }
  }

  render() {
    if (!this.props.showChat) {
      return null;
    }
    
    return (
        <View style={styles.container}>
            <GiftedChat
              renderInputToolBar={this.renderInputToolBar}
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              maxInputLength= {this.props.maxInput}
              user={{
                  _id: 1,
              }}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  voiceButton: {
    height: 80,
  },
  text: {
    textAlign: 'center'
  },
  accessoryStyle: {
    height: 8
  }
});