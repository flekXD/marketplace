import React, { useState } from 'react';
import axios from 'axios';
import '../../shared/UIElements/form.css'

const Register = () => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API with the form data
      await axios.post('http://localhost:3001/user/add', {
        first_name: userFirstName,
        last_name: userLastName,
        email : userEmail,
        password : userPassword,
      });

      // Clear the form fields after successful submission
      setUserFirstName('');
      setUserLastName('');
      setUserEmail('');
      setUserPassword('');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <body>
        <main>
            <form onSubmit={handleSubmit}>
            <div>
                <label class="large-label">First name:</label>
                <input type="text" value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)} />
            </div>
            <div>
                <label class="large-label">Last name:</label>
                <input type="text" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} />
            </div>
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
                <button type="reset">Clear Form</button>
            </div>
            </form>
        </main>
    </body>
  );
};

export default Register;