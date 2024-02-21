import React from 'react';
import './Style/LawyerSignup.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './Firebase.js';

const LawyerSignup = () => {
    const [selectedOption, setSelectedOption] = React.useState('');
    const [Lawyer, setLawyer] = React.useState({
        name: "",
        email: "",
        field: "",
        password: "",
    })

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    let name, value;
    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setLawyer({ ...Lawyer, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault();

        const { name, email, field, password } = Lawyer;

        if (name && email && field && password) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // const userId = userCredential.user.uid;
                await saveUserDataToDatabase(name, email, field);
                console.log(userCredential);
                
                alert(`Welcome ${name}, Your account has been created successfully!`);
                setLawyer({
                    name: "",
                    email: "",
                    field: "",
                    password: "",
                });
            } catch (error) {
                console.error('Error creating user account:', error.message);
            }
        } else {
            alert('Please fill all the entries.');
        }
    };

    // Function to save user data to Firebase Realtime Database
    const saveUserDataToDatabase = async (name, email, field) => {
        try {
            await fetch(`https://solution-challenge-c5b79-default-rtdb.firebaseio.com/users/LawyerData.json`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    field,
                }),
            });
        } catch (error) {
            console.error('Error saving user data to database:', error.message);
        }
    };



    return (
        <div className="container-fluid">
            <div className="box">
                <h3><span className="span"></span>Sign Up</h3>

                <form action="#" method='POST'>

                    <div className="input_box">
                        <label>Username</label>
                        <input type="text" name='name' required onChange={(e) => { getUserData(e) }} />
                    </div>
                    <div className="input_box">
                        <label>Email</label>
                        <input type="text" name='email' required onChange={(e) => { getUserData(e) }} />
                    </div>
                    <div className="input_box" style={{ padding: '10px 0px' }}>
                        <label>Field</label>
                        <select className='select' name='field' value={selectedOption} onChange={(e) => {
                            getUserData(e)
                            handleOptionChange(e)
                        }}>
                            <option value="">Select an option</option>
                            <option value="Civil Litigation">Civil Litigation</option>
                            <option value="Criminal Defence">Criminal Defence</option>
                            <option value="Family">Family</option>
                            <option value="Real State">Real State</option>
                            <option value="BankRupty">BankRupty</option>
                        </select>
                    </div>
                    <div className="input_box">
                        <label>Password</label>
                        <input type="password" name='password' required onChange={(e) => { getUserData(e) }} />
                    </div>

                </form>

                <div className="row">
                    <div className="col-6 otherAccount">
                        <p class="forgot_password"><a href="/customer-signup">Not an Advocate?</a></p>
                    </div>
                    <div className="col-6 otherAccount">
                        <p class="forgot_password"><a href="/">Already have an Account?</a></p>
                    </div>
                </div>

                <button className='submitButton' onClick={postData} type="submit">Create an Account</button>
            </div>
        </div>
    );
}

export default LawyerSignup;
