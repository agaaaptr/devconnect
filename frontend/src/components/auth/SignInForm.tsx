import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface SignInFormProps {
    onSignInSuccess: () => void;
    onSwitchForm: (isSignIn: boolean) => void; // New prop
}

const SignInForm: React.FC<SignInFormProps> = ({ onSignInSuccess, onSwitchForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Validation error states
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const validateForm = () => {
        let isValid = true;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid email format.');
            isValid = false;
        } else {
            setEmailError(null);
        }

        // Password validation
        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        } else {
            setPasswordError(null);
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to sign in.');
            }

            // Assuming data contains access_token and refresh_token
            localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
            onSignInSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthSignIn = async (provider: 'google' | 'github') => {
        setError(null);
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: window.location.origin,
                },
            });

            if (error) {
                throw new Error(error.message);
            }
            // OAuth flow will redirect, so no need to call onSignInSuccess here
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">Email</label>
                <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-input text-foreground"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(null); }}
                    required
                />
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">Password</label>
                <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-input text-foreground"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(null); }}
                    required
                />
                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={loading}
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-muted-foreground">OR</span>
                <div className="flex-grow border-t border-border"></div>
            </div>

            <button
                type="button"
                onClick={() => handleOAuthSignIn('google')}
                className="w-full flex justify-center items-center py-2 px-4 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-card hover:bg-card-foreground/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={loading}
            >
                <img src="/google.svg" alt="Google" className="h-5 w-5 mr-2" />
                Sign In with Google
            </button>
            <button
                type="button"
                onClick={() => handleOAuthSignIn('github')}
                className="w-full flex justify-center items-center py-2 px-4 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-card hover:bg-card-foreground/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={loading}
            >
                <img src="/github.svg" alt="GitHub" className="h-5 w-5 mr-2" />
                Sign In with GitHub
            </button>

            <p className="text-center text-sm text-muted-foreground mt-4">
                New to DevConnect? {' '}
                <button 
                    type="button" 
                    onClick={() => onSwitchForm(false)} 
                    className="text-primary hover:underline focus:outline-none focus:underline"
                >
                    Sign Up
                </button>
            </p>
        </form>
    );
};

export default SignInForm;
