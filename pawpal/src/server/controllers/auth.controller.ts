import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = '7d';

// Signup function (creates a user, returns user and sets httpOnly cookie)
export const signup = async (req: Request, res: Response) => {
    const { username, email, password, dogBreed, profilePicture } = req.body;

    try {
        const existing = await User.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            return res.status(409).json({ message: 'Email or username already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, dogBreed, profilePicture });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Set cookie (httpOnly) for session maintenance
        // Add SameSite and explicit path for better CSRF protection
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        };

        res.cookie('token', token, cookieOptions);

        res.status(201).json({ user: { id: newUser._id, username: newUser.username, email: newUser.email, dogBreed: newUser.dogBreed, profilePicture: newUser.profilePicture } });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Login function (verifies credentials, sets cookie)
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        };

        res.cookie('token', token, cookieOptions);

        res.status(200).json({ user: { id: user._id, username: user.username, email: user.email, dogBreed: user.dogBreed, profilePicture: user.profilePicture } });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Logout (clears cookie)
export const logout = async (_req: Request, res: Response) => {
    // Clear cookie using same options to ensure it is removed in browsers
    const clearOptions = { path: '/' };
    res.clearCookie('token', clearOptions);
    res.status(200).json({ message: 'Logged out' });
};

// Get current user
export const me = async (req: Request, res: Response) => {
    try {
        // auth middleware will have attached userId
        // @ts-ignore
        const userId = req.userId;
        if (!userId) return res.status(401).json({ message: 'Not authenticated' });

        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};