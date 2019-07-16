import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import useForm from '../hooks/useForm';
import Input from '../components/Input';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import isAuthenticated from '../utils/isAuthenticated';

/**
 * Sentencia para crear un nuevo post desde graphql.
 */
const CREATE_POST = gql`
    mutation CreatePost($data:createPostAuthor!){
        createPost(data:$data){
            _id,
            title
        }
    }
`;

/**
 * Función que crea un nuevo post.
 */
function Create({ history }) {

    const [cover_photo, setCoverPhoto] = useState('');
    const [coverPreview, setCoverPreview] = useState('');

    const [sendPost, { data, error }] = useMutation(CREATE_POST);

    const handleCover = event => {

        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {

            setCoverPhoto(file);
            setCoverPreview(reader.result);
        }

        reader.readAsDataURL(file); //Convierta la imagen en Base64.
    }

    const catchPost = async (fields) => {

        await sendPost({ variables: { data: { ...fields, cover_photo } } });

        if (data) history.push(`/post/${data.createPost._id}`);
        
        if (error) console.log(error);
    }

    const { inputs, handleInputChange, handleSubmit } = useForm(catchPost);

    return (
        <>
            <Navbar />
            <Header />

            <main className="container">
                
                <section className="row">
                    
                    <div className="col-lg-8 col-md-10 mx-auto">
                        
                        <form onSubmit={handleSubmit}>
                            <Input name="title" label="Title" type="text" placeholder="Title" value={inputs.title} onChange={handleInputChange} required />
                            
                            <div className="control-group">
                                <div className="form-group floating-label form-group controls">
                                    <textarea name="content" onChange={handleInputChange} placeholder="Content" value={inputs.content} cols="60" rows="10"></textarea>
                                </div>
                            </div>

                            <Input name="cover_photo" label="Cover Photo" type="file" placeholder="Cover Photo" onChange={handleCover} required />

                            <img src={coverPreview} alt="preview" className="d-block w50" />

                            <button type="submit" className="btn btn-primary mt-4">Save</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default isAuthenticated(Create);