import { StyleSheet, Image, View, Text, TouchableHighlight } from 'react-native';
import {LinearGradient} from 'expo'
import React from 'react';


export default class MenuBar extends React.Component {
  constructor(props) {
      super();
  }


  render() {
    return (
      <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.container}>
          <TouchableHighlight onPress={this.props.startScreen}>
              <Image style={styles.icon} source={require('../icons/homeScreenIcon.png')}>

              </Image>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => { this.props.changeChannel(-1) }}>
              <Image style={styles.icon} source={require('../icons/plusIcon.png')}>

              </Image>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => { this.props.changeChannel(-2) }}>
              <Image style={styles.icon} source={require('../icons/minusIcon.png')}>

              </Image>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.props.viewChat}>
              <Image style={styles.icon} source={require('../icons/chatIcon.png')}>

              </Image>
          </TouchableHighlight>
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'darkgray',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  icon: {
      width: 25,
      height: 25,
      marginVertical: 5
  }
});
