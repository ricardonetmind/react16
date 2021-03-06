import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';


class UserForm extends Component {
  state = { name: 'ric', email: 'r@r.com', redirect: false };

  redirectToTarget = () => {
    this.props.history.push(`/`)
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  handleNameChange = (e) => {
    const name = e.target.value;
    if(!name.match(/[0-9]/g)) this.setState({ name: e.target.value });
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var name = this.state.name.trim();
    var email = this.state.email.trim();
    if (!name || !email) {
      return;
    }

    console.log(name, email);

    this.props.onUserSubmit({ name: name, email: email });
    this.setState({ name: '', email: '', redirect: true });
    // this.redirectToTarget();
  }

  render() {
    console.log('UserBox:',this.props);
    

    return (
      <form className="userForm" onSubmit={this.handleSubmit}>
        {this.renderRedirect()}
        <h2>Nuevo Usuario</h2>
        <p><input
          type="text"
          placeholder="Nombre"
          value={this.state.name}
          onChange={this.handleNameChange}
        /></p>
        <p><input
          type="text"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        /></p>
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default withRouter(UserForm);
