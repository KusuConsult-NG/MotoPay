import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { StaggerContainer, StaggerItem } from '../components/ui/Animations';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import contentService, { type FAQ, type HelpCategory } from '../services/content.service';

export default function Help() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [categories, setCategories] = useState<HelpCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Static fallback data
    const staticFaqs: FAQ[] = [
        {
            id: '1',
            category: 'general',
            question: 'How do I renew my vehicle license?',
            answer: 'Start by entering your vehicle plate number on the lookup page. Verify your details, select renewal options, and proceed to payment. You will receive your receipt via email and SMS.',
            order: 1,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '2',
            category: 'payments',
            question: 'What payment methods are accepted?',
            answer: 'We accept all major debit and credit cards through our secure Paystack payment gateway. You can also pay using bank transfers and USSD.',
            order: 2,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '3',
            category: 'general',
            question: 'How long does processing take?',
            answer: 'Most renewals are processed instantly after payment confirmation. Your receipt and license documents are sent to your email immediately upon successful payment.',
            order: 3,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '4',
            category: 'registration',
            question: 'What documents do I need?',
            answer: 'For renewals, you typically need your vehicle registration, proof of ownership, road worthiness certificate, and insurance. Commercial vehicles may require additional permits.',
            order: 4,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '5',
            category: 'general',
            question: 'Can I renew for multiple vehicles?',
            answer: 'Yes! You can renew multiple vehicles by completing the process for each vehicle separately. Authorized agents can also handle bulk renewals.',
            order: 5,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '6',
            category: 'compliance',
            question: 'How do I become an agent?',
            answer: 'Contact PSIRS at agent@motopay.ng with your application. Approved agents receive login credentials and can track commissions through the agent portal.',
            order: 6,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '7',
            category: 'general',
            question: 'What if my vehicle information is wrong?',
            answer: 'If you notice incorrect vehicle information, please contact our support team immediately. Exceptions can be raised through the admin panel for resolution.',
            order: 7,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '8',
            category: 'payments',
            question: 'How do I get a receipt?',
            answer: 'Receipts are automatically sent to your email and phone number after successful payment. You can also access and download receipts from your transaction history.',
            order: 8,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
    ];

    const staticCategories: HelpCategory[] = [
        {
            id: '1',
            icon: 'directions_car',
            title: 'Vehicle Registration',
            link: '/lookup',
            description: 'Learn about registering new and used vehicles',
            order: 1,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '2',
            icon: 'payment',
            title: 'Payments & Fees',
            link: '/services',
            description: 'Understanding fees, charges, and payment options',
            order: 2,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '3',
            icon: 'verified',
            title: 'Compliance',
            link: '/commercial',
            description: 'Requirements for commercial and private vehicles',
            order: 3,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '4',
            icon: 'support_agent',
            title: 'Agent Support',
            link: '/login',
            description: 'Resources for authorized agents',
            order: 4,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
    ];

    useEffect(() => {
        const fetchHelpContent = async () => {
            try {
                const [faqsResponse, categoriesResponse] = await Promise.all([
                    contentService.getFAQs(),
                    contentService.getHelpCategories(),
                ]);

                if (faqsResponse.success && faqsResponse.data && faqsResponse.data.length > 0) {
                    setFaqs(faqsResponse.data);
                } else {
                    setFaqs(staticFaqs);
                }

                if (categoriesResponse.success && categoriesResponse.data && categoriesResponse.data.length > 0) {
                    setCategories(categoriesResponse.data);
                } else {
                    setCategories(staticCategories);
                }
            } catch (error) {
                console.error('Failed to fetch help content, using static data:', error);
                setFaqs(staticFaqs);
                setCategories(staticCategories);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHelpContent();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-background-light">
                {/* Hero */}
                <div className="bg-gradient-to-br from-primary to-plateau-green text-white py-20">
                    <div className="max-w-[1280px] mx-auto px-6 text-center">
                        <h1 className="text-5xl font-black mb-4">Help Center</h1>
                        <p className="text-xl opacity-90">Find answers to common questions</p>
                    </div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 py-16">
                    {/* Quick Links */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-[#0d101b] mb-8 text-center">Browse by Category</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((category, index) => (
                                <Link
                                    key={index}
                                    to={category.link}
                                    className="bg-white rounded-xl border border-[#cfd3e7] p-6 hover:shadow-lg transition-all hover:border-primary"
                                >
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-primary">{category.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-[#0d101b] mb-2">{category.title}</h3>
                                    <p className="text-sm text-[#4c599a]">{category.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div>
                        <h2 className="text-3xl font-bold text-[#0d101b] mb-8 text-center">Frequently Asked Questions</h2>
                        <StaggerContainer>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <StaggerItem key={index}>
                                        <details className="bg-white rounded-xl border border-[#cfd3e7] overflow-hidden group">
                                            <summary className="px-6 py-5 cursor-pointer font-bold text-[#0d101b] flex items-center justify-between hover:bg-primary/5 transition-colors">
                                                {faq.question}
                                                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                                                    expand_more
                                                </span>
                                            </summary>
                                            <div className="px-6 pb-5 pt-2 text-[#4c599a] leading-relaxed border-t border-[#e7e9f3]">
                                                {faq.answer}
                                            </div>
                                        </details>
                                    </StaggerItem>
                                ))}
                            </div>
                        </StaggerContainer>
                    </div>

                    {/* Contact Support */}
                    <div className="mt-16 bg-primary/10 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl font-bold text-[#0d101b] mb-4">Still need help?</h2>
                        <p className="text-[#4c599a] mb-8">Our support team is ready to assist you</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
                            >
                                <span className="material-symbols-outlined">email</span>
                                Contact Support
                            </Link>
                            <a
                                href="tel:+2347323456789"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined">phone</span>
                                Call Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
