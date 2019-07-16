import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthenticated from './utils/isAuthenticated';
import Home from './views/Home';
import Post from './views/Post';
import Login from './views/Login';
import Singup from './views/Signup';
import Create from './views/Create';

/**
 * Función que elimina el token una vez que el usuario cierra sesión.
 */
function Logout() {
  localStorage.removeItem('blogToken')
  return <Redirect to='/login' />
}

/**
 * Obtiene el componente correspondiente.
 */
const SecureLogOut = isAuthenticated(Logout);

/**
 * Función encargada de controlaras las rutas de la aplicación.
 */
function Routes() {
  return (
    <>
      <Route exact path='/' component={Home} />
      <Route exact path='/post/:id' component={Post} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Singup} />
      <Route exact path='/logout' component={SecureLogOut} />
      <Route exact path='/create' component={Create} />
    </>
  );
}

export default Routes;
