import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './Navigation';
import UserBox from './UserBox';
// import UserForm from './UserForm';

const UserForm = lazy(() => import('./UserForm'));

class App extends Component {
	state = { data: [] };

	loadUsersFromServer = () => {
		fetch('http://localhost:8080/users', { method: 'get' })
			.then(response => response.json())
			.then(json => {
				console.log("JSON:", json);
				this.setState({ data: json });

			})
			.catch(function (err) {
				console.log(err);
			});

	}

	handleUserSubmit = (user) => {
		var users = this.state.data;
		user.id = Date.now();
		var newUsers = users.concat([user]);
		this.setState({ data: newUsers });

		console.log(user, newUsers);
	}

	componentDidMount() {
		this.loadUsersFromServer();
	}

	render() {
		return (
			<div className="container">
				<h1>Usuarios</h1>
				<Navigation />
				<Switch>
					<Route exact path='/' component={() => <UserBox data={this.state.data} />}></Route>
					<Route exact path='/new' render={() =>
						<Suspense fallback="Loading...">
							<UserForm onUserSubmit={this.handleUserSubmit} {...this.props} />
						</Suspense>
					}></Route>
				</Switch>
			</div>
		)
	}
}

export default App;