import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import VideoPlayer from './VideoPlayer';
import Chat from './Chat';
import MenuBar from './MenuBar';
import Login from './Login';

// const channels = [
//   {channel: 'https://s3.eu-west-2.amazonaws.com/communitv-videos/Ninja_Warrior_2017.mp4', socket: 'ninja'},
//   {channel: 'https://r1---sn-4g5e6nsy.googlevideo.com/videoplayback?source=youtube&pl=23&clen=118122336&id=o-ANZftwQUw8bpZMFQ2XIrcMJmvGAacM6WpMr6Ymw2eZcg&ratebypass=yes&lmt=1535237122033964&fvip=1&c=WEB&signature=79360CD65F2271A9D0808D96238AA4E5875D4C89.1AD1F065992B66E5AADBA75B16D9DEA2EFB16C74&ipbits=0&ip=31.146.161.238&key=cms1&dur=2230.206&ei=My2_W_K_O9SR1gKfkI_wBQ&requiressl=yes&sparams=clen,dur,ei,expire,gir,id,ip,ipbits,ipbypass,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&expire=1539277204&itag=18&mime=video%2Fmp4&gir=yes&video_id=w-bJhiBPLHo&title=%D7%94%D7%97%D7%91%D7%A8%D7%99%D7%9D+%D7%A9%D7%9C+%D7%A0%D7%90%D7%95%D7%A8+%D7%A2%D7%95%D7%A0%D7%94+1+%D7%A4%D7%A8%D7%A7+13+%D7%9C%D7%A6%D7%A4%D7%99%D7%99%D7%94+%D7%99%D7%A9%D7%99%D7%A8%D7%94+%D7%94%D7%A4%D7%A8%D7%A7+%D7%94%D7%9E%D7%9C%D7%90&rm=sn-npa3oxu-ucns7r,sn-4g5ezr7e&fexp=23763603&req_id=a21b33f6c1c0a3ee&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mip=212.143.234.100&mm=29&mn=sn-4g5e6nsy&ms=rdu&mt=1539255391&mv=u', socket: 'bigBrother'},
//   {channel: 'https://s3.eu-west-2.amazonaws.com/communitv-videos/worldcup2018.mp4', socket: 'football'},
//   {channel: 'https://s3.eu-west-2.amazonaws.com/communitv-videos/worldcup2018.mp4', socket: 'realityShow'}
// ];

const channels = [
  {channel: 'https://s3.eu-west-2.amazonaws.com/communitv-videos/Ninja_Warrior_2017.mp4', socket: 'ninja'},
  {channel: 'https://s3.eu-west-2.amazonaws.com/communitv-videos/bigBrother.mp4', socket: 'bigBrother'},
  {channel: 'https://s3.eu-west-2.amazonaws.com/communitv-videos/friendsOfNaor.mp4', socket: 'realityShow'},
  {channel: 'https://s3.eu-west-2.amazonaws.com/communitv-videos/footballmatch.mp4', socket: 'football'}
];

export default class StartScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      screen: 'start',
      chat: true,
      chatActivated: false,
      socket: '',
      channelLink: '',
      maxInput: 10000
    }
  }

  changeChannel = (channel) => {
    this.index = channel >= 0 ? channel : channel === -1 ? this.index + 1 : this.index - 1;
    this.index = this.index > channels.length -1 ? 0 : this.index < 0 ? channels.length -1 : this.index;
    let socket = channels[this.index].socket;
    let channelLink = channels[this.index].channel;
    this.setState({
      screen: 'video',
      chatActivated: false,
      socket: socket,
      channelLink: channelLink,
      maxInput: this.state.maxInput + 1
    });
  }

  startScreen = () => {
    this.setState({screen: 'start', chatActivated: false});
  }

  activateChat = () => {
    this.setState({chatActivated: true});
  }

  chatStatus = () => {
    this.setState({chat: !this.state.chat, chatActivated: true});
  }

  updateName = (username) => {
    this.setState({userName: username});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.screen === 'start' ?
        <View style={styles.logosContainer}>
          <View style={styles.logos}>
            <TouchableHighlight style={styles.highlight} onPress={() => { this.changeChannel(3) }} underlayColor="white">
              <Image style={styles.button} source={require('../icons/sport5Icon.png')}/>
            </TouchableHighlight>
            <TouchableHighlight style={styles.highlight} onPress={() => { this.changeChannel(2) }} underlayColor="white">
              <Image style={styles.button} source={require('../icons/channel10Icon.png')}/>
            </TouchableHighlight>
          </View>
          <View style={styles.logos}>
            <TouchableHighlight style={styles.highlight} onPress={() => { this.changeChannel(1) }} underlayColor="white">
              <Image style={styles.button} source={require('../icons/newsIcon.png')}/>
            </TouchableHighlight>
            <TouchableHighlight style={styles.highlight} onPress={() => { this.changeChannel(0) }} underlayColor="white">
              <Image style={styles.button} source={require('../icons/HBOIcon.png')}/>
            </TouchableHighlight>
          </View>
        </View>
        : this.state.screen === 'video' ?
          this.state.userName ?
            <View style={styles.watchLive}>
              <VideoPlayer video={this.state.channelLink}/>
              <Chat name={this.state.userName} showChat={this.state.chat} socket={this.state.socket} isActivated={this.state.chatActivated} chatUsed={this.activateChat} maxInput={this.state.maxInput}/>
              <MenuBar startScreen={this.startScreen} changeChannel={this.changeChannel} viewChat={this.chatStatus}/> 
            </View>
          :
            <Login updateName={this.updateName}/>
        :
          <View style={styles.chat}>  
            <Chat socket={this.state.socket} startScreen={this.startScreen}/>
            <MenuBar startScreen={this.startScreen} changeChannel={this.changeChannel} viewChat={this.chatStatus}/> 
          </View>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logosContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    height: 100,
    width: 200,
   },
   logos: {
    justifyContent: 'space-between',
    flexDirection: 'row',
   },
   highlight: {
    padding: 10
   },
   watchLive: {
    flex: 1,
    flexDirection: 'row',
   },
   homeScreen: {
    backgroundColor: '#fff',
    fontSize: 16,
    borderWidth: 2, 
    borderColor: '#8cbbe5',
    borderRadius: 5,
    textAlign: 'center'
  },
  chat: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
