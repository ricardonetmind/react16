import React from 'react';
import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';

import LibrosBox from './containers/libros'
import PrestamosBox from './containers/prestamos'

import { libros } from './data/libros'
import Usuario from './models/usuario';
import Navigation from './Navigation';

import { Switch, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  state = { libros: [], prestamo: null, usuario: null }

  componentDidMount() {
    this.setState({ libros, usuario: new Usuario(1, 'Ricardo', 'r@r.com', null) });
  }

  prestarHandler = (id) => {
    const libros = this.state.libros;
    const prestamo = libros.find(aL => aL.id === id);
    if (prestamo) this.setState({ prestamo });
  }

  prestadoHandler = (idLibro) => {
    const libros = this.state.libros;
    libros.map(aL => aL.prestado = (aL.id === idLibro ? true : aL.prestado));
    this.setState({ prestamo: null, libros })
  }

  devueltoHandler = (idLibro) => {
    const libros = this.state.libros;
    libros.map(aL => aL.prestado = (aL.id === idLibro ? false : aL.prestado));
    this.setState({ prestamo: null, libros })
  }

  render() {

    return (
      <Container maxWidth="sm">
        {this.state.prestamo?<Redirect to="/prestamos/nuevo" />:null}
        <Navigation />

        <Switch>
          <Route exact path="/"><Redirect to="/libros" /></Route>
          <Route exact path="/libros" render={() => <LibrosBox libros={libros} prestar={this.prestarHandler} />} />
          <Route path="/prestamos" render={() =>
            <PrestamosBox
              prestamo={this.state.prestamo}
              usuario={this.state.usuario}
              prestado={this.prestadoHandler}
              devuelto={this.devueltoHandler}
            />
          } />
        </Switch>
      </Container>
    );
  }
}

export default App;
