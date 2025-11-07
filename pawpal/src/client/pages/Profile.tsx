import React from 'react';
import useAuth from '../hooks/useAuth';
import PostCard from '../components/PostCard';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();

    if (!user) return <div>Loading...</div>;

    const u: any = user;

    return (
        <div className="profile">
            <h1>{u.username}'s Profile</h1>
            <p>Breed: {u.dogBreed}</p>
            <p>Email: {u.email}</p>
            <h2>Your Posts</h2>
            <div className="posts">
                {/* Posts fetching per-user can be implemented later */}
                <p className="text-slate-500">Your posts will appear here.</p>
            </div>
        </div>
    );
};

export default Profile;