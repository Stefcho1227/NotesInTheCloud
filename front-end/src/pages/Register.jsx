import React, {useState} from "react";
import {useNavigate} from "react-router";
import axios from "axios";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/api/auth/register", {email, username, password});
            navigate("/");
        } catch(err) {
            setError("Registration failed. Please try again.");
        }
    }

    return (
        <main>
            <section>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email: </label>
                        <input
                            type = "email"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)} required
                        />
                    </div>

                    <div>
                        <label>Username: </label>
                        <input
                            type = "text"
                            value = {username}
                            onChange = {(e) => setUsername(e.target.value)} required
                        />
                    </div>

                    <div>
                        <label>Password: </label>
                        <input
                            type = "password"
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)} required
                        />
                    </div>

                    <button type="submit">Register</button>

                    {error && <p className="authError">{error}</p>}
                </form>

                <p>Already have an account? <a href = "/" onClick={(e) => {e.preventDefault(); navigate('/');}}>Log in</a></p>
            </section>
        </main>
    );
}

export default Register;