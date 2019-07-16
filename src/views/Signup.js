import React from "react";
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import Input from '../components/Input';
import useForm from '../hooks/useForm';

const ADD_AUTHOR = gql`
    mutation addAuthor($data:createAuthorInput!){
        createAuthor(data:$data){
            _id,
            first_name,
        }
    }
`;

/**
 * Función encargada de registrar a un author.
 * @param {*} param0 
 */
function Singup({ history }) {

    const [sendSignup, { error }] = useMutation(ADD_AUTHOR);

    /**
     * Función que obtiene el evento submit y se encarga de enviar los datos.
     * @param {*} fields 
     */
    const catchSubmit = async (fields) => {

        if (fields.password === fields.confirm_password) {
           
            delete fields.confirm_password; //Borramos la propiedad confirm_password.

            await sendSignup({ variables: { data: { ...fields } } }); //Se envian los datos.

            error ? alert('Hubo un error') : history.push('/login'); //En caso de ser exitoso se redirecciona al login en caso contrario se muestra un mensaje de error.

        } else {
            alert('Los Passwords no coinciden');
        }

    }

    const { inputs, handleInputChange, handleSubmit } = useForm(catchSubmit);

    return (
        <>
            <NavBar />
            <Header />
            <main className="container">
                <section className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <Input name="first_name" label="First Name" placeholder="First Name" type="text" value={inputs.first_name} onChange={handleInputChange} required />
                            <Input name="last_name" label="Last Name" placeholder="Last Name" type="text" value={inputs.last_name} onChange={handleInputChange} required />
                            <Input name="email" label="Email" placeholder="Email" type="email" value={inputs.email} onChange={handleInputChange} required />
                            <Input name="password" label="Password" placeholder="Password" type="password" value={inputs.password} onChange={handleInputChange} required />
                            <Input name="confirm_password" placeholder="Confirm Password" label="Confirm Password" type="text" value={inputs.confirm_password} onChange={handleInputChange} required />

                            <button type="submit" className="btn btn-primary">Send</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Singup;
