import React, { Component } from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
  }
});

type Props = {
  isLoading: boolean,
  name: string,
  onChange: Function,
  // onSubmit: Function,
  // userName: string,
};

export default class LoginForm extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        {/* <TextInput
          disabled={this.props.isLoading}
          label="username"
          onChangeText={this.props.onChange("username")}
          style={styles.textInput}
          value={this.props.userName}
        /> */}
        <Input
          disabled={this.props.isLoading}
          placeholder="Name"
          onChangeText={this.props.onChange}
          value={this.props.name}
        />
        <Button
          // onPress={onSubmit}
          title={!this.props.isLoading ? 'Save' : 'Loading ...'}
        />
      </SafeAreaView>
    );
  }
};
