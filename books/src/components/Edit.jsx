/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Apiurl } from '../services/apirest';
import axios from 'axios';
import {useNavigate} from 'react-router'
import Header from '../template/Header'

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    let book = {
        id: 0,
        title: "",
        description: "",
        pageCount: 0,
        excerpt: "",
        publishDate: ""
    };

    const [form, setForm] = useState({
        id: 0,
        title: "",
        description: "",
        pageCount: 0,
        excerpt: "",
        publishDate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(Apiurl+'/'+id, form)
            .then((resp) => {
                console.log(resp);
                navigate('/')
            })
            .catch(() => {
            });

    };

    useEffect(() => {
        axios(Apiurl + '/' + id)
        .then(response => {
            console.log(response.data);
            book = {
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                pageCount: response.data.pageCount,
                excerpt: response.data.excerpt,
                publishDate: response.data.publishDate
            }
            setForm(book)


            
        }
    )},[])

    return (
        <>
        <Header></Header>
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <h2>Edit Book</h2>
                </div>
                <div className='col-md-8'>
                    <form onSubmit={handleSubmit}>

                        <div className='form-group'>
                            <label htmlFor='title'>Title: </label>
                            <input
                                className='form-control'
                                type='text'
                                id='title'
                                onChange={handleChange}
                                value={form.title}
                                name='title'
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='description'>description: </label>
                            <input
                                className='form-control'
                                type='text'
                                id='description'
                                onChange={handleChange}
                                value={form.description}
                                name='description'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='pageCount'>page Count: </label>
                            <input
                                className='form-control'
                                type='number'
                                id='pageCount'
                                onChange={handleChange}
                                value={form.pageCount}
                                name='pageCount'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='excerpt'>excerpt: </label>
                            <input
                                className='form-control'
                                type='text'
                                id='excerpt'
                                onChange={handleChange}
                                value={form.excerpt}
                                name='excerpt'
                            />
                        </div>
                        
                        <div className='form-group'>
                            <label htmlFor='publishDate'>publishDate: </label>
                            <input
                                className='form-control'
                                type='datetime-local'
                                id='publishDate'
                                onChange={handleChange}
                                value={form.publishDate}
                                name='publishDate'
                            />

                        </div>

                        <div className='form-group'>
                            <Link 
                                to="/"
                                className='btn btn-light mt-2 btn-block'
                            >
                                Back
                            </Link>
                        </div>

                        <div className='form-group'>
                            <button
                                type='submit'
                                className='btn btn-primary mt-2 btn-block'
                            >
                                Edit Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}


export default Edit