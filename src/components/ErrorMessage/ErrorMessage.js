import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements';

type Props = {
  message: string,
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
})

const ErrorMessage = (props: Props) => (
  <Text style={styles.text}>{props.message}</Text>
)

export default ErrorMessage;
