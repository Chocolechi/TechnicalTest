/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/scope */
import React from 'react';
import Header from '../template/Header';

import { Apiurl } from '../services/apirest';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {

    state = {
        books: []
    }

    componentDidMount() {
        let url = Apiurl
        axios.get(url)
            .then(response => {
                this.setState({
                    books: response.data
                })
            })
    }

    render() {
        return (
            <>
                <Header></Header>
                <div className="content mb-4">
                    <div className="container mt-5">

                        <div className="table-responsive">
                        <Link to='/New' className='btn btn-primary'>Create New Book </Link>

                            <table className="table table-striped custom-table">
                                <thead>
                                    <tr>

                                        <th scope="col">Id</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Page Count</th>
                                        <th scope="col">excerpt</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.books.map((value, index) => {
                                        return (
                                            <tr scope="row" key={index} onClick={() => this.clickBook(value.id)}>
                                                <td>{value.id}</td>
                                                <td>{value.title}</td>
                                                <td>
                                                    {value.description.substring(0, 30)}
                                                </td>
                                                <td>{value.pageCount}</td>

                                                <td>{value.excerpt.substring(0, 20)}</td>

                                                <td>
                                                    <Link to={`/edit/${value.id}`} className="more">Edit</Link>
                                                    <br />
                                                    <a href='#' onClick={() => {
                                                        let confirmDel = confirm(`R u sure u want to delete ${value.title}`);
                                                        if(confirmDel){
                                                            axios.delete(Apiurl + '/' + value.id)
                                                            .then(() => {
                                                                alert('Record was deleted');
                                                            });
                                                        }else{
                                                        }
                                                        
                                                    }} className="more">Delete</a>
                                                </td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}
export default Dashboard