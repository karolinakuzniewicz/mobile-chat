import { AsyncStorage } from 'react-native';

class AuthorService {
  static nameKey = 'author_name';
  static userNameKey = 'author_userName';

  static async setName(name: string) {
    return AsyncStorage.setItem(this.nameKey, name)
  }

  static async getName() {
    return AsyncStorage.getItem(this.nameKey)
  }

  static async setUserName(name: string) {
    return AsyncStorage.setItem(this.userNameKey, name)
  }

  static async getUserName() {
    return AsyncStorage.getItem(this.userNameKey)
  }
}

export default AuthorService;
