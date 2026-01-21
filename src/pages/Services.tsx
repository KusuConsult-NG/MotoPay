import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { StaggerContainer, StaggerItem } from '../components/ui/Animations';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import contentService, { type Service } from '../services/content.service';

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Static fallback data
    const staticServices: Service[] = [
        {
            id: '1',
            icon: 'description',
            title: 'Vehicle Registration',
            description: 'Quick and easy vehicle registration for private, commercial, and motorcycle vehicles.',
            features: ['Online application', 'Document verification', 'Instant receipt'],
            order: 1,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '2',
            icon: 'credit_card',
            title: 'License Renewal',
            description: 'Renew your vehicle license online with instant payment processing.',
            features: ['Multiple payment options', 'SMS confirmation', 'Digital receipts'],
            order: 2,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '3',
            icon: 'verified',
            title: 'Compliance Check',
            description: 'Verify your vehicle compliance status and required documents.',
            features: ['Real-time verification', 'Compliance dashboard', 'Document tracking'],
            order: 3,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '4',
            icon: 'local_shipping',
            title: 'Commercial Permits',
            description: 'Apply for and manage commercial vehicle permits and badges.',
            features: ['Hackney permits', "Driver's badges", 'Fleet management'],
            order: 4,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '5',
            icon: 'receipt_long',
            title: 'Transaction History',
            description: 'Access your complete payment and renewal history anytime.',
            features: ['Detailed records', 'Export to PDF', 'Email receipts'],
            order: 5,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: '6',
            icon: 'support_agent',
            title: 'Agent Services',
            description: 'Authorized agents can assist with registrations and renewals.',
            features: ['Commission tracking', 'Bulk renewals', 'Customer support'],
            order: 6,
            isActive: true,
            createdAt: '',
            updatedAt: '',
        },
    ];

    useEffect(() => {
        // Initialize with static data immediately
        setServices(staticServices);
        setIsLoading(false);

        // Try to fetch from API with timeout
        const fetchServices = async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

            try {
                const response = await contentService.getServices();
                clearTimeout(timeoutId);

                if (response.success && response.data && response.data.length > 0) {
                    setServices(response.data);
                }
            } catch (error) {
                console.log('Using static services data');
            }
        };

        fetchServices();
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
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-primary to-plateau-green text-white py-20">
                    <div className="max-w-[1280px] mx-auto px-6 text-center">
                        <h1 className="text-5xl font-black mb-4">Our Services</h1>
                        <p className="text-xl opacity-90">Comprehensive vehicle licensing and compliance solutions for Plateau State</p>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="max-w-[1280px] mx-auto px-6 py-16">
                    <StaggerContainer>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <StaggerItem key={index}>
                                    <div className="bg-white rounded-xl border border-[#cfd3e7] p-8 hover:shadow-lg transition-shadow">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                            <span className="material-symbols-outlined text-primary text-3xl">{service.icon}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#0d101b] mb-3">{service.title}</h3>
                                        <p className="text-[#4c599a] mb-6">{service.description}</p>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-[#0d101b]">
                                                    <span className="material-symbols-outlined text-plateau-green text-lg">check_circle</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </StaggerItem>
                            ))}
                        </div>
                    </StaggerContainer>

                    {/* CTA Section */}
                    <div className="mt-16 bg-primary/10 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl font-bold text-[#0d101b] mb-4">Ready to get started?</h2>
                        <p className="text-[#4c599a] mb-8">Begin your vehicle registration or renewal process today</p>
                        <Link
                            to="/lookup"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
                        >
                            Start Now
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
