import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  container: {
    width: '60%',
    borderWidth: 2,
    borderColor: 'pink',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  likesCount: {
    paddingTop: 5,
    paddingRight: 10,
  },
})

type Props = {
  content: string,
  author: string,
  likesCount: number,
  picture: string,
  onMessageLike: Function,
  onMessageShare: Function,
};

const ChatMessage = (props: Props) => (
  <View style={styles.container}>
    {!!picture && (
      <Image
        source={{ uri: picture }}
        style={{ width: 80, height: 80 }}
      />
    )}

    <Text h1>{props.content}</Text>
    <Text>{props.author}</Text>
    <View style={styles.footer}>
      <Text style={styles.likesCount}>{props.likesCount}</Text>
      <TouchableOpacity
        onPress={props.onMessageLike}
        onLongPress={props.onMessageShare}
      >
        <Icon name="thumb-up" size={25} color="#3b5998" />
      </TouchableOpacity>
    </View>
  </View>
);

export default ChatMessage;
