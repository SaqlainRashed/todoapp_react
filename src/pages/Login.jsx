import React, {useContext, useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { server, Context } from '../main';
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {

    const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e)=>{    
        // to keep on the same page to fetch data from backend
        e.preventDefault();
        setLoading(true);
        try{
            const { data } = await axios.post(
                `${server}/users/login`,
                {
                    email,
                    password
                },
                {
                    headers:{
                        "Content-Type":"application/json"
                },
                    withCredentials:true,
                }
            );

            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        }
        catch(error){
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    };

    if(isAuthenticated) return <Navigate to={"/"} />
    return (
        <div className='login'>
            <section>
                <form onSubmit={submitHandler}>
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        type='email' 
                        placeholder='Email'
                        required 
                    />
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        type='password' 
                        placeholder='Password' 
                        required
                    />
                    <button disabled={loading} type='submit'>Log In</button>
                    <h4>Or</h4>
                    <Link to="/register">Sign Up</Link>
                </form>
            </section>
        </div>
    );
};

export default Login;
