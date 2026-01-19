import { useState } from 'react';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';
import contactService from '../services/contact.service';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await contactService.submitForm(formData);

            if (response.success) {
                toast.success(response.message || 'Message sent successfully!');
                setFormData({ name: '', email: '', subject: '', message: '' });
            }
        } catch (error: any) {
            console.error('Contact form error:', error);
            toast.error(error?.message || 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-background-light">
                {/* Hero */}
                <div className="bg-gradient-to-br from-primary to-plateau-green text-white py-20">
                    <div className="max-w-[1280px] mx-auto px-6 text-center">
                        <h1 className="text-5xl font-black mb-4">Contact Us</h1>
                        <p className="text-xl opacity-90">We're here to help with your questions</p>
                    </div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-[#0d101b] mb-6">Get in Touch</h2>
                                <p className="text-[#4c599a] leading-relaxed">
                                    Have questions about vehicle registration or renewals? Our team is ready to assist you.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">location_on</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0d101b] mb-1">Office Address</h3>
                                        <p className="text-[#4c599a]">
                                            Plateau State Internal Revenue Service<br />
                                            No. 3 Murtala Muhammed Way<br />
                                            Jos, Plateau State, Nigeria
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">phone</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0d101b] mb-1">Phone</h3>
                                        <p className="text-[#4c599a]">
                                            +234 (073) 234-5678<br />
                                            +234 (073) 234-5679
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">email</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0d101b] mb-1">Email</h3>
                                        <p className="text-[#4c599a]">
                                            support@motopay.pl.gov.ng<br />
                                            info@psirs.gov.ng
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">schedule</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0d101b] mb-1">Working Hours</h3>
                                        <p className="text-[#4c599a]">
                                            Monday - Friday: 8:00 AM - 5:00 PM<br />
                                            Saturday: 9:00 AM - 2:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl border border-[#cfd3e7] p-8">
                            <h2 className="text-2xl font-bold text-[#0d101b] mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#0d101b] mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e7e9f3] focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="Your full name"
                                    />
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
                                        className="w-full px-4 py-3 rounded-lg border border-[#e7e9f3] focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#0d101b] mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e7e9f3] focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#0d101b] mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e7e9f3] focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
