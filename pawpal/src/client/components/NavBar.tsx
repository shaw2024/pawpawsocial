import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const NavBar: React.FC = () => {
    const { user, logout } = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await logout();
            history.push('/');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <nav className="w-full bg-white shadow-sm py-3">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                <div className="text-xl font-semibold">
                    <Link to="/">PawPal</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/timeline" className="text-slate-700">Timeline</Link>
                    <Link to="/profile" className="text-slate-700">Profile</Link>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <img src={user.profilePicture || '/images/default-profile.png'} alt="avatar" className="w-8 h-8 rounded-full" />
                            <span className="text-slate-700">{user.username}</span>
                            <button onClick={handleLogout} className="text-sm text-red-500">Logout</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-slate-700">Login</Link>
                            <Link to="/signup" className="text-amber-500 font-medium">Join</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;