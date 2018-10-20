import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

export default class Login extends React.Component {
  constructor(props) {
      super();
      this.state = {
        isSigninInProgress: true,
        submitBlank: ''
      }
  }

  changeUserName = (text) => {
    this.username = text;
    console.log(text);
  }

  submitUser = () => {
    if (!this.username) {
      this.setState({submitBlank: true})
      return;
    }

    this.props.updateName(this.username);
  }

  render() {
    return (
    <View style={styles.container}>
      <FormLabel>Enter A Username</FormLabel>
      <FormInput onChangeText={this.changeUserName} containerStyle={styles.input} inputStyle={styles.text}>
      </FormInput>
      {this.state.submitBlank ? 
        <FormValidationMessage>{'This field is required'}</FormValidationMessage>
      :  null}
      <View style={styles.padding}>
        <TouchableHighlight style={styles.button} onPress={this.submitUser}>
          <Text style={styles.text}>Submit</Text>
        </TouchableHighlight>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    backgroundColor: '#86939e',
  },
  text: {
    color: '#129efa',
    fontWeight: 'bold' 
  },
  input: {
    width: 300,
    alignItems: 'center',
    flexDirection: 'row',
  },
  padding: {
    padding: 10
  }
});
