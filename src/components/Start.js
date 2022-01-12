import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../Axios';
import { Link } from 'react-router-dom'
const Start = (props) => {
    const history = useNavigate();
    const [logintext, setlogintext] = useState("")
    const [registertext, setregistertext] = useState("")
    const [formData, updateFormData] = useState({ email: "", password: "" });
    const [formData1, updateFormData1] = useState({ name: "", email: "", password: "", mobile: "" });
    const handleChange1 = (e) => {
        updateFormData1({
            ...formData1,
            [e.target.name]: e.target.value.trim(),
        })
    };

    const handleSubmit1 = (e) => {
        e.preventDefault();
        console.log(formData1);
        function ValidateEmail(mail) {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return (true)
            }
            setregistertext("invalid email");
            return (false)
        }
        if (formData1.password.length >= 4 && formData1.name.length >= 3 && ValidateEmail(formData1.email)) {

            const registeruser = async () => {
                try {
                    const resp = await axiosInstance.post('staffRegister/', formData1);
                    if (resp.status === 200) {
                        const div = document.querySelector('.modal-backdrop') // Get element from DOM
                        div.classList.remove('modal-backdrop');
                        const div1 = document.querySelector('.fade') // Get element from DOM
                        div1.classList.remove('fade');
                        const div2 = document.querySelector('.show') // Get element from DOM
                        div2.classList.remove('show');
                        props.showalert("Registration Successful","success");
                        history('/');
                    }
                } catch (error) {
                    if (error.response.status === 400) {
                        setregistertext("Some of the fields are missing or incorrect");
                        setTimeout(() => {
                            setregistertext("");
                        }, 4000);
                    }
                    else if (error.response.status === 402) {
                        setregistertext("User Already Exists with the given email id");
                        setTimeout(() => {
                            setregistertext("");
                        }, 4000);
                    }
                    else {
                        setregistertext("some other error occured");
                    }
                }

            }
            registeruser();
        }
        else {
            setregistertext("please fill fields correctly");
        }


    };
    const handleChange = (e) => {

        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })


    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const logindata = async () => {
            try {
                const resp = await axiosInstance.post('staffLogin/', {
                    email: formData.email,
                    password: formData.password
                });
                localStorage.setItem('access_token', resp.data.access);
                localStorage.setItem('refresh_token', resp.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                console.log(resp.status);
                if (resp.status === 200) {
                    document.getElementById("exampleModalCenter").classList.remove("show");
                    const div = document.querySelector('.modal-backdrop') // Get element from DOM
                    div.classList.remove('modal-backdrop');
                    const div1 = document.querySelector('.fade') // Get element from DOM
                    div1.classList.remove('fade');
                    const div2 = document.querySelector('.show') // Get element from DOM
                    div2.classList.remove('show');
                    props.showalert("Login Successful","success")
                    history('/userhomepage');
                }
            } catch (error) {
                if (error.response.status === 400) {
                    setlogintext("Email/password is missing");
                    setTimeout(() => {
                        setlogintext("");
                    }, 4000);
                }
                else if (error.response.status === 401) {
                    setlogintext("Email or password is incorrect");
                    setTimeout(() => {
                        setlogintext("");
                    }, 4000);
                }
                else {
                    setlogintext("some error occured");
                }


            }
        }
        logindata();

    };


    return (
        <>


            <div style={{ height: "100vh", width: "100vw", backgroundColor: "#42f548" }}>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">


                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link text-primary" to="/">Authentication</Link>
                            </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <button class="btn btn-outline-success mx-4 my-2 my-sm-0" type="button" data-toggle="modal" data-target="#exampleModalCenter">Login</button>
                            <button class="btn btn-outline-success mx-4 my-2 my-sm-0" type="button" data-toggle="modal" data-target="#exampleModalCenter1">Register</button>
                        </form>

                    </div>
                </nav>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Login Form</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email</label>
                                        <input name="email" type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                        <small id="emailHelp" className="form-text text-muted"></small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input style={{ border: '2px solid black' }} name="password" type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <p style={{ color: "red" }}>{logintext}</p>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary">login</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Signup Form</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Name</label>
                                        <input type="text" className="form-control" onChange={handleChange1} aria-describedby="emailHelp" name="name" placeholder="Enter Name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email Address</label>
                                        <input type="text" className="form-control" onChange={handleChange1} aria-describedby="emailHelp" name="email" placeholder="Enter email" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="text" className="form-control" onChange={handleChange1} name="password" placeholder="Password" />
                                        <small id="emailHelp" className="form-text text-muted">Password Must be Atleast 8 Letters Long</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Mobile</label>
                                        <input type="text" className="form-control" onChange={handleChange1} aria-describedby="emailHelp" name="mobile" placeholder="Enter email" />
                                    </div>
                                    <p style={{ color: "red" }}>{registertext}</p>
                                </form>

                            </div>
                            <div class="modal-footer">
                                <button type="submit" onClick={handleSubmit1} className="btn btn-primary">Signup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>


    )
}
export default Start
