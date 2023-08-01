import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from 'axios';

import '../../shared/UIElements/form.css'

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Make a POST request to the backend API with the form data
          await axios.post('http://localhost:3001/users/login', {
            email : userEmail,
            password: userPassword,
          });
    
          // Clear the form fields after successful submission
          setUserEmail('');
          setUserPassword('');
        } catch (error) {
          console.error('Error posting data:', error);
        }
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
                        <button type="submit">Send Response</button>
                        <Link to={`/user/registration`}><button type="button">Registration</button></Link>
                    </div>
                </form>
            </main>
        </body>
    )
}

export default Login;