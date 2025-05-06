import React, {useState} from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import "../Auth.css";

function LogIn() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/api/auth/login", {username, password});
            navigate("/notes");
        } catch(err) {
            setError("Invalid username or password.");
        }
    }

    return (
        <div className="loginPage">
        <main>
            <section>
                <h1>Log in</h1>
                <form onSubmit={handleSubmit}>
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

                    <button type="submit">Log In</button>

                    {error && <p className="authError">{error}</p>}
                </form>

                <p>Do not have an account yet? <a href = "/register" onClick={(e) => {e.preventDefault(); navigate('/register');}}>Register</a></p>
            </section>
        </main>
        </div>
    );

}

export default LogIn;