import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import contentService, { type AboutSection } from '../services/content.service';

export default function About() {
    const [sections, setSections] = useState<AboutSection[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Static fallback data
    const staticContent = {
        mission: {
            title: 'Our Mission',
            content: 'MotoPay is the official digital platform for the Plateau State Internal Revenue Service (PSIRS) designed to simplify vehicle licensing, renewals, and compliance management. We are committed to providing efficient, transparent, and accessible services to all vehicle owners in Plateau State.',
        },
        whatWeDo: {
            title: 'What We Do',
            items: [
                'Process vehicle registrations and license renewals online',
                'Verify vehicle compliance with state regulations',
                'Manage commercial vehicle permits and badges',
                'Provide secure payment processing through Paystack',
                'Support authorized agents with commission tracking',
            ],
        },
        whyChoose: {
            title: 'Why Choose MotoPay?',
            items: [
                { icon: 'speed', title: 'Fast & Efficient', description: 'Complete renewals in minutes, not hours' },
                { icon: 'security', title: 'Secure Payments', description: 'Bank-grade encryption for all transactions' },
                { icon: 'phone_android', title: 'Mobile Friendly', description: 'Access from any device, anywhere' },
                { icon: 'support_agent', title: '24/7 Support', description: "We're here to help when you need us" },
            ],
        },
    };

    useEffect(() => {
        // Set not loading immediately to show static content
        setIsLoading(false);

        // Try to fetch from API with timeout
        const fetchAbout = async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            try {
                const response = await contentService.getAboutSections();
                clearTimeout(timeoutId);

                if (response.success && response.data && response.data.length > 0) {
                    setSections(response.data);
                }
            } catch (error) {
                console.log('Using static about content');
            }
        };

        fetchAbout();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    // Use API data if available, otherwise use static content
    const mission = sections.find(s => s.section === 'mission') || staticContent.mission;
    const whatWeDo = sections.find(s => s.section === 'what-we-do') || staticContent.whatWeDo;
    const whyChoose = sections.find(s => s.section === 'why-choose') || staticContent.whyChoose;

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
                            <h2 className="text-3xl font-bold text-[#0d101b] mb-4">{mission.title}</h2>
                            <p className="text-[#4c599a] leading-relaxed text-lg">
                                {mission.content}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-[#0d101b] mb-4">{whatWeDo.title}</h2>
                            <ul className="space-y-3 text-[#4c599a] leading-relaxed text-lg">
                                {(whatWeDo.items || []).map((item: string, index: number) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-plateau-green mt-1">check_circle</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-[#0d101b] mb-4">{whyChoose.title}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {(whyChoose.items || []).map((benefit: any, index: number) => (
                                    <div key={index} className="p-6 bg-primary/5 rounded-lg">
                                        <h3 className="font-bold text-[#0d101b] mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">{benefit.icon}</span>
                                            {benefit.title}
                                        </h3>
                                        <p className="text-sm text-[#4c599a]">{benefit.description}</p>
                                    </div>
                                ))}
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
