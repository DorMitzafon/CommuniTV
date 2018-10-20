import React from 'react';
import {Video} from 'expo';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class VideoPlayer extends React.Component {
  constructor(props) {
      super();
  }

  _onLoad = async playbackStatus => {
    let vidDuration = playbackStatus.durationMillis;
    let now = Date.now();
    let currentHour = new Date(now).getHours();
    let currentMinutes = new Date(now).getMinutes();
    let currentSeconds = new Date(now).getSeconds();
    let milliFromBaseHour = 0;
    if (currentHour >= 11) {
      milliFromBaseHour += (currentHour - 11) * 1000 * 60 * 60;
      milliFromBaseHour += currentMinutes * 1000 * 60;
      milliFromBaseHour += currentSeconds * 1000;
    } else {
      milliFromBaseHour += (11 - currentHour - 1) * 1000 * 60 * 60;
      milliFromBaseHour += (60 - currentMinutes) * 1000 * 60;
      milliFromBaseHour += (60 -currentSeconds) * 1000;
    }

    diffFromVid = milliFromBaseHour % vidDuration;
    let status = await this._video.setStatusAsync({ shouldPlay: true, positionMillis: diffFromVid })
  }
  
  _mountVideo = component => {
    this._video = component;  
  }

  render() {
    return (
      <View style={styles.container}>
        <Video source={{ uri: this.props.video }}
            ref={this._mountVideo}
            onLoad={this._onLoad}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            shouldPlay={false}
            isLooping
            style={styles.videoPlayer}
        />
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  videoPlayer: {
    flex: 1,
    backgroundColor: '#000'
  },
});
