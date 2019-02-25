import React, { Component } from 'react';

import LoginForm from '../../components/LoginForm';
import { AuthorService } from '../../services';

type Props = {};
type State = {
  isLoading: boolean,
  name: string,
  userName: string,
};

export default class LoginPage extends Component<Props, State> {
  state = {
    isLoading: false,
    name: '',
    userName: '',
  }

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.initializeAuthor();
  }

  onInputChange = (inputLabel: string, event) => {
    this.setState({
      ...this.state,
      [inputLabel]: event.target.value
    });
  }

  initializeAuthor = async () => {
    this.setState({ name: await AuthorService.getName() })
  }

  login = async() => {
    this.setState({ isLoading: true })
    await this.initializeAuthor()
    this.setState({ isLoading: false })
  }

  render() {
    return(
      <LoginForm
        isLoading={this.state.isLoading}
        name={this.state.name}
        // onChange={this.onInputChange}
        onChange={text => this.setState({ name: text })}
        // onSubmit={}
        userName={this.state.userName}
      />
    )
  }
}
