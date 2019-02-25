import React from 'react';
import { FlatList, Image, TouchableOpacity, Share, StyleSheet, Vibration, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Input } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-simple-toast'

import ChatMessage from '../../components/ChatMessage';
import ErrorMessage from '../../components/ChatMessage'
import { AuthorService,  MessageService } from '../../services'

const styles = StyleSheet.create({
  messageContainer: {
    paddingVertical: 5,
  },
  messageContainerRight: {
    alignItems: 'flex-end',
  },
})

type Props = {};

type State = {
  error: string,
  isLoading: boolean,
  message: string,
  messages: Array,
  pictureSource: string,
  pictureData: string,
};
export default class ChatPage extends Component<Props, State> {
  state = {
    error: '',
    isLoading: false,
    message: '',
    messages: [],
    pictureData: null,
    pictureSource: null,
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.fetchMessages()
  }

  fetchMessages = async () => {
    this.setState({ isLoading: true });

    try {
      const messages = await MessageService.getAll();
    } catch (e) {
      const error = 'Unable to fetch messages, check your internet connection';
    }

    if (this.hasMessagesChanged(messages)) {
      Vibration.vibrate();
    }

    this.setState({
      ...this.state,
      error,
      isLoading: false,
      messages
    })
  }

  selectPicture = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker error: ', response.error)
      } else {
        this.setState({
          pictureSource: response.uri,
          pictureData: response.data,
        })
      }
    })
  }

  sendMessage = async () => {
    await MessageService.create(this.state.message, await AuthorService.getName(), this.state.pictureData)
    await this.fetchMessages()
  }

  hasMessagesChanged(messages) {
    return messages.length > 0;
  }

  likeMessage = async (message) => {
    try {
      await MessageService.like(message.id, await AuthorService.getName())
    } catch (error) {
      Toast.show('Not this time, sorry')
      return
    }

    // Dirty way to update likes count
    const newMessages = this.state.messages.map((m) => {
      if (m.id === message.id) {
        m.likes_count += 1
      }

      return m
    })

    this.setState({ messages: newMessages })
  }

  shareMessage = async (message) => {
    Share.share({
      message: message.content,
      title: message.author,
      url: message.image || null,
    })
  }

  render() {
    return(
      <Grid>
        <Row style={{ height: 75 }}>
          <Col>
            <Input
              placeholder="Message"
              value={this.state.message}
              disabled={this.state.isLoading}
              onChangeText={text => this.setState({ message: text })}
            />
          </Col>

          <Col style={{ width: 60 }}>
            {picture ? (
              <Image source={{ uri: this.state.pictureSource }} style={{ width: 50, height: 50 }} />
            ) : (
              <TouchableOpacity onPress={this.selectPicture}>
                <Icon
                  name="camera"
                  size={50}
                  color="blue"
                />
              </TouchableOpacity>
            )}
          </Col>

          <Col style={{ width: 60 }}>
            <TouchableOpacity onPress={this.sendMessage}>
              <Icon
                name="send"
                size={50}
                color="red"
              />
            </TouchableOpacity>
          </Col>
        </Row>

        <Row>
          <FlatList
            renderItem={({ index, item }) => (
              <View style={[
                styles.messageContainer,
                index % 2 ? styles.messageContainerRight : null,
              ]}
              >
                <ChatMessage
                  content={item.content}
                  author={item.author}
                  likesCount={item.likes_count}
                  picture={item.image}
                  onMessageLike={this.likeMessage}
                  onMessageShare={this.shareMessage}
                />
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            data={this.state.messages}
            refreshing={this.state.isLoading}
            onRefresh={this.fetchMessages}
          />
        </Row>

        {error && (
          <Row>
            <ErrorMessage message={this.state.error} />
          </Row>
        )}
      </Grid>
    )
  }
}
