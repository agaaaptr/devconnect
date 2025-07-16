import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, username, name } = req.body;
        const supabase = req.app.get('supabase');

        if (!email || !password || !username || !name) {
            return res.status(400).json({ message: 'Email, password, username, and name are required.' });
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    name
                }
            }
        });

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        // Send a clean response instead of the raw Supabase object
        res.status(201).json({ 
            message: 'Signup successful. Please check your email for verification.',
            user: data.user 
        });
    } catch (error: any) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error during signup.' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const supabase = req.app.get('supabase');

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        res.status(200).json(data);
    } catch (error: any) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error during login.' });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const supabase = req.app.get('supabase');
        const { error } = await supabase.auth.signOut();

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        res.status(200).json({ message: 'Successfully logged out.' });
    } catch (error: any) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error during logout.' });
    }
};
