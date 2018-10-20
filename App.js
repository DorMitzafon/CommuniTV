import React from 'react';
import { StyleSheet, ImageBackground, View, I18nManager } from 'react-native';
import StartScreen from './components/StartScreen';

try {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
} catch (e) {
  console.log(e);
}
console.ignoredYellowBox = ['Remote debugger'];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false,
      info: {}
    }
  }

  changeLogin = (login, info) => {
    this.setState({login: login, info: info});
  }

  render() {
    return (
        <ImageBackground source={require('./icons/CommuniTV-background.png')} style={styles.container}>
          <StartScreen userInfo={this.state.userInfo}/>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export default Expo.registerRootComponent(App);