import axios from 'axios';

const API_URL = 'http://46.101.140.45/api/v1';

class MessageService {
  static async getAll() {
    return (await axios.get(`${API_URL}/messages/`)).data
  }

  static async create(content, author, image = null) {
    return (await axios.post(`${API_URL}/messages/`, {
      content, author, image,
    })).data
  }

  static async like(messageId, author) {
    return (await axios.post(`${API_URL}/messages/${messageId}/like/`, {
      author,
    })).data
  }
}

export default MessageService;
