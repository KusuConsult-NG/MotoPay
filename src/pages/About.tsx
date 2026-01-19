import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

export default function About() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-background-light">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-primary to-plateau-green text-white py-20">
                    <div className="max-w-[1280px] mx-auto px-6 text-center">
                        <h1 className="text-5xl font-black mb-4">About MotoPay</h1>
                        <p className="text-xl opacity-90">Modernizing vehicle licensing for Plateau State</p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-[900px] mx-auto px-6 py-16">
                    <div className="bg-white rounded-2xl border border-[#cfd3e7] p-12 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#0d101b] mb-4">Our Mission</h2>
                            <p className="text-[#4c599a] leading-relaxed text-lg">
                                MotoPay is the official digital platform for the Plateau State Internal Revenue Service (PSIRS) designed to simplify vehicle licensing, renewals, and compliance management. We are committed to providing efficient, transparent, and accessible services to all vehicle owners in Plateau State.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-[#0d101b] mb-4">What We Do</h2>
                            <ul className="space-y-3 text-[#4c599a] leading-relaxed text-lg">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-plateau-green mt-1">check_circle</span>
                                    <span>Process vehicle registrations and license renewals online</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-plateau-green mt-1">check_circle</span>
                                    <span>Verify vehicle compliance with state regulations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-plateau-green mt-1">check_circle</span>
                                    <span>Manage commercial vehicle permits and badges</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-plateau-green mt-1">check_circle</span>
                                    <span>Provide secure payment processing through Paystack</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-plateau-green mt-1">check_circle</span>
                                    <span>Support authorized agents with commission tracking</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-[#0d101b] mb-4">Why Choose MotoPay?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-primary/5 rounded-lg">
                                    <h3 className="font-bold text-[#0d101b] mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">speed</span>
                                        Fast & Efficient
                                    </h3>
                                    <p className="text-sm text-[#4c599a]">Complete renewals in minutes, not hours</p>
                                </div>
                                <div className="p-6 bg-primary/5 rounded-lg">
                                    <h3 className="font-bold text-[#0d101b] mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">security</span>
                                        Secure Payments
                                    </h3>
                                    <p className="text-sm text-[#4c599a]">Bank-grade encryption for all transactions</p>
                                </div>
                                <div className="p-6 bg-primary/5 rounded-lg">
                                    <h3 className="font-bold text-[#0d101b] mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">phone_android</span>
                                        Mobile Friendly
                                    </h3>
                                    <p className="text-sm text-[#4c599a]">Access from any device, anywhere</p>
                                </div>
                                <div className="p-6 bg-primary/5 rounded-lg">
                                    <h3 className="font-bold text-[#0d101b] mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">support_agent</span>
                                        24/7 Support
                                    </h3>
                                    <p className="text-sm text-[#4c599a]">We're here to help when you need us</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-[#e7e9f3] text-center">
                            <p className="text-[#4c599a] mb-6">Ready to experience hassle-free vehicle licensing?</p>
                            <Link
                                to="/lookup"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
                            >
                                Get Started
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
