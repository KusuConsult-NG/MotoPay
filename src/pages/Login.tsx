import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await login(formData.email, formData.password);
            if (response.success) {
                toast.success('Login successful!');
                // Redirect based on role will be handled by user state in AuthContext
                // For now, redirect to agent dashboard (can be improved)
                navigate('/agent');
            } else {
                toast.error(response.message || 'Login failed');
            }
        } catch (error: any) {
            toast.error(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-plateau-green/10">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                        <span className="material-symbols-outlined text-primary text-3xl">lock</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">MotoPay Login</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Plateau State Revenue Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-slate-600 dark:text-slate-400">
                            Don't have an account?{' '}
                            <a
                                href="/register"
                                className="text-primary hover:text-primary/80 font-semibold transition-colors"
                            >
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
