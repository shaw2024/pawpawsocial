import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dogBreed, setDogBreed] = useState('');
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // For now we send basic form data; profile upload can be handled separately
            await signup({ username, email, password, dogBreed });
            history.push('/login');
        } catch (err) {
            setError('Failed to create an account. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dogBreed">Dog Breed</label>
                    <input
                        type="text"
                        id="dogBreed"
                        value={dogBreed}
                        onChange={(e) => setDogBreed(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="profile">Profile Photo (optional)</label>
                    <input
                        type="file"
                        id="profile"
                        accept="image/*"
                        onChange={(e) => setProfileFile(e.target.files ? e.target.files[0] : null)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Account</button>
            </form>
            <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
    );
};

export default Signup;