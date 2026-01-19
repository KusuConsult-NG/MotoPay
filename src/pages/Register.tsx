import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/auth.service';
import type { RegisterRequest } from '../types/api.types';

export default function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<RegisterRequest>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await authService.register(formData);

            if (response.success) {
                toast.success('Registration successful! Please log in.');
                navigate('/login');
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            toast.error(error?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-plateau-green p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center gap-3 mb-8">
                    <div className="size-14 flex items-center justify-center bg-white rounded-lg text-primary shadow-lg">
                        <span className="material-symbols-outlined text-3xl">account_balance</span>
                    </div>
                    <div className="flex flex-col text-white">
                        <h2 className="text-2xl font-black leading-none tracking-tight">MotoPay</h2>
                        <span className="text-xs uppercase font-bold tracking-widest opacity-90">Plateau State PSIRS</span>
                    </div>
                </Link>

                {/* Register Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h1 className="text-3xl font-black text-[#0d101b] mb-2">Create Account</h1>
                    <p className="text-[#4c599a] mb-8">Join MotoPay to manage your vehicle licenses</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#0d101b] mb-2">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-[#e7e9f3] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#0d101b] mb-2">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-[#e7e9f3] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#0d101b] mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-[#e7e9f3] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#0d101b] mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                required
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-[#e7e9f3] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="+234 XXX XXX XXXX"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#0d101b] mb-2">
                                Password *
                            </label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-[#e7e9f3] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="Minimum 6 characters"
                            />
                            <p className="text-xs text-[#4c599a] mt-1">Must be at least 6 characters</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-6 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">person_add</span>
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-[#4c599a]">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-bold hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#e7e9f3] text-center">
                        <p className="text-xs text-[#4c599a]">
                            By creating an account, you agree to our{' '}
                            <a href="#" className="text-primary hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link to="/" className="text-white text-sm hover:underline opacity-90">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
