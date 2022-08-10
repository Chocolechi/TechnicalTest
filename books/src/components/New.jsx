import {  useState } from 'react';
import {  Link } from 'react-router-dom';
import { Apiurl } from '../services/apirest';
import axios from 'axios';
import {useNavigate} from 'react-router'
import Header from '../template/Header'


const New = () => {
    const navigate = useNavigate();

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
            .post(Apiurl, form)
            .then((resp) => {
                console.log(resp);
                navigate('/')
            })
            .catch(() => {
            });

    };

    
    return (
        <>
        <Header></Header>
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <h2>Create Book</h2>
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
                                Create Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}


export default New