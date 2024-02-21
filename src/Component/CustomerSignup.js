import React from 'react';
import './Style/CustomerSignup.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './Firebase.js';

const CustomerSignup = () => {
    const [user, setUser] = React.useState({
        name: "",
        email: "",
        age: "",
        password: "",
    })

    let name, value;
    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUser({ ...user, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault();
    
        const { name, email, age, password } = user;
        if (name && email && age && password) {
            try {
                // Create user account using authentication service (assuming `auth` is defined)
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
                // Display user credential information
                console.log(userCredential);
    
                // Assuming you want to make a POST request to save user data to a Firebase Realtime Database
                const response = await fetch('https://solution-challenge-c5b79-default-rtdb.firebaseio.com/CustomerData.json', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        age,
                        password, // Note: You may not want to send the password to the server for security reasons.
                    }),
                });
    
                // Check if the POST request was successful
                if (response.ok) {
                    alert(`Welcome ${user.name}, You can make your Profile now`);
                    // Reset user state after successful registration
                    setUser({
                        name: "",
                        email: "",
                        age: "",
                        password: "",
                    });
                } else {
                    // Handle errors from the server
                    console.error('Failed to save user data to the server.');
                    // Display an appropriate message to the user
                    alert('Failed to save user data. Please try again later.');
                }
            } catch (error) {
                // Handle authentication or database errors
                console.error('Error during registration:', error.message);
                // Display an appropriate message to the user
                alert('An error occurred during registration. Please try again later.');
            }
        } else {
            // If any required field is missing, show an alert to the user
            alert('Please fill in all the entries.');
        }
    };
    

    return (
        <div className="container-fluid">
            <div className="box">
                <h3><span className="span"></span>Sign Up</h3>

                <form action="#" method='POST'>

                    <div className="input_box">
                        <label>Username</label>
                        <input type="text" name='name' value={user.name} required onChange={(event) => getUserData(event)} />
                    </div>
                    <div className="input_box">
                        <label>Email</label>
                        <input type="text" name='email' value={user.email} required onChange={(event) => getUserData(event)} />
                    </div>
                    <div className="input_box">
                        <label>Age</label>
                        <input type="text" name='age' value={user.age} onChange={(event) => getUserData(event)} />
                    </div>
                    <div className="input_box">
                        <label>Password</label>
                        <input type="password" name='password' value={user.password} required onChange={(event) => getUserData(event)} />
                    </div>

                </form>

                <div className="row">
                    <div className="col-6 otherAccount">
                        <p className="forgot_password"><a href="/lawyer-signup">Are you an Advocate?</a></p>
                    </div>
                    <div className="col-6 otherAccount">
                        <p className="forgot_password"><a href="/">Already have an Account?</a></p>
                    </div>
                </div>

                <button className='submitButton' type="submit" onClick={postData}>Create an Account</button>
            </div>
        </div>
    );
}

export default CustomerSignup;
