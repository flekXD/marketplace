import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from 'axios';
import {useDispatch} from "react-redux";
import '../../shared/UIElements/form.css'
import { setUser } from "../../reducers/userReducer";
import Log from '../components/log'

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(Log(userEmail, userPassword));
        /*try {
          // Make a POST request to the backend API with the form data
          const response = await axios.post('http://localhost:3001/users/login', {
            email : userEmail,
            password: userPassword,
          });
          console.log(response.data);
          handleSubmit(setUser(response.data.user))
          localStorage.setItem('token', response.data.token)
          // Clear the form fields after successful submission
          setUserEmail('');
          setUserPassword('');
        } catch (error) {
          console.error('Error posting data:', error);
        }*/
        setUserEmail('');
        setUserPassword('');
      };

    return(
        <body>
            <main>
            <h2>Please login into you account</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label class="large-label">Email:</label>
                        <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                    <div>
                        <label class="large-label">Password:</label>
                        <input type="text" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                    </div>
                    <div class="full-width">
                        <button type="submit">Login</button>
                        <Link to={`/user/register`}><button type="button">Registration</button></Link>
                    </div>
                </form>
            </main>
        </body>
    )
}

export default Login;