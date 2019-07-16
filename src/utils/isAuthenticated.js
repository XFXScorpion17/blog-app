import React from 'react';
import payload from './payload';
import { Redirect } from 'react-router-dom';

/**
 * Función que prueba si el usuario esta logueado , en caso de cumplirse 
 * se proporciona el componente que se le este pasando 
 * en caso contrario redirecciona a iniciar sesión.
 * @param {*} WrappedComponent 
 */
export default function (WrappedComponent) {
    return function (props) {
        return payload().isAuthenticated ? <WrappedComponent {...props} /> : <Redirect to="/" />
    }
}