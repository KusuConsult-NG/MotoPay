import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { StaggerContainer, StaggerItem } from '../components/ui/Animations';
import AnimatedButton from '../components/ui/AnimatedButton';

export default function Home() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/lookup?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <PageTransition>
            <div className="max-w-[1280px] mx-auto px-6">
                {/* Hero Section */}
                <section className="py-12 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-8 order-2 lg:order-1">
                            <div className="flex flex-col gap-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-plateau-green/10 text-plateau-green w-fit">
                                    <span className="material-symbols-outlined text-sm">verified</span>
                                    <span className="text-xs font-bold uppercase tracking-wider">Official State Portal</span>
                                </div>
                                <h1 className="text-[#0d101b] text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                                    Plateau State Vehicle <span className="text-primary">Levy & Insurance</span> Portal
                                </h1>
                                <p className="text-[#4c599a] text-lg leading-relaxed max-w-xl">
                                    Fast, secure, and transparent renewals for all Plateau residents. Ensure your vehicle is compliant with state regulations in minutes from your home or office.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <AnimatedButton
                                    onClick={() => navigate('/lookup')}
                                    variant="primary"
                                    size="lg"
                                    className="flex-1 sm:flex-none min-w-[200px] shadow-lg shadow-primary/20"
                                >
                                    Private Vehicle Renewal
                                </AnimatedButton>
                                <AnimatedButton
                                    onClick={() => navigate('/commercial')}
                                    variant="secondary"
                                    size="lg"
                                    className="flex-1 sm:flex-none min-w-[200px]"
                                >
                                    Commercial Vehicle Renewal
                                </AnimatedButton>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-plateau-green rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div
                                    className="relative w-full aspect-[4/3] bg-center bg-no-repeat bg-cover rounded-2xl shadow-2xl border-4 border-white"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMD9P9OwCgT-wwnZwiuCN5bq5wdlRoBMRpU8Df8fESq-kM-J9pOhpxKF4EI_nMTNDSOhKeLrMr4gGLjdLfU35w1AdvTq7a0vnh6QlE3iXTju7CFoXiE_8Utyh3HHi8C8nCYOQ6hsD2H4NvNH5j9zyhnppU-lMdH1kyK9Z4RD459LgG3tetK90lzVSRyMBNFbALPS9RKRuVNkoEqe0ZcsXbTXstZZ9fQYofsbJr_deaEUa3FhpUqxUkk6IaGmisP0gA-_7R0Tak67c")' }}
                                    aria-label="Aerial view of Jos City landscape"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Search Bar Area */}
                <section className="relative z-10 -mt-8 md:-mt-12 mb-16 max-w-4xl mx-auto" role="search" aria-label="Vehicle status lookup">
                    <div className="bg-white rounded-2xl shadow-xl p-2 md:p-3 border border-[#e7e9f3]">
                        <div className="flex flex-col md:flex-row items-center gap-2">
                            <div className="flex flex-1 items-center w-full px-4 gap-3">
                                <span className="material-symbols-outlined text-[#4c599a]" aria-hidden="true">search</span>
                                <input
                                    className="w-full h-12 bg-transparent border-none focus:ring-0 text-[#0d101b] placeholder:text-[#4c599a]/60 text-base"
                                    placeholder="Track Status: Enter Plate Number or Reference ID"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    aria-label="Enter plate number or reference ID"
                                />
                            </div>
                            <AnimatedButton
                                onClick={handleSearch}
                                variant="success"
                                size="lg"
                                className="w-full md:w-auto px-8"
                            >
                                Check Status
                            </AnimatedButton>
                        </div>
                    </div>
                </section>

                {/* Section Header: Quick Services */}
                <div className="flex items-center justify-between mb-8 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                        <h2 className="text-2xl font-bold text-[#0d101b]">Quick Services</h2>
                    </div>
                    <a className="text-primary font-semibold flex items-center gap-1 hover:underline" href="#">
                        View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>

                {/* Quick Services Grid */}
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 px-4">
                    {/* Card 1 */}
                    <StaggerItem>
                        <div className="group flex flex-col gap-4 p-6 rounded-2xl border border-[#cfd3e7] bg-white hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer" role="button" tabIndex={0} aria-label="Verify insurance service">
                            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined" aria-hidden="true">shield</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold text-[#0d101b]">Verify Insurance</h3>
                                <p className="text-[#4c599a] text-sm leading-relaxed">Check policy validity and expiration date instantly.</p>
                            </div>
                        </div>
                    </StaggerItem>

                    {/* Card 2 */}
                    <StaggerItem>
                        <div className="group flex flex-col gap-4 p-6 rounded-2xl border border-[#cfd3e7] bg-white hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer" role="button" tabIndex={0} aria-label="Download receipt service">
                            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined" aria-hidden="true">file_download</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold text-[#0d101b]">Download Receipt</h3>
                                <p className="text-[#4c599a] text-sm leading-relaxed">Access and download your digital payment documents.</p>
                            </div>
                        </div>
                    </StaggerItem>

                    {/* Card 3 */}
                    <StaggerItem>
                        <div className="group flex flex-col gap-4 p-6 rounded-2xl border border-[#cfd3e7] bg-white hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer" role="button" tabIndex={0} aria-label="New vehicle registration service">
                            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined" aria-hidden="true">add_circle</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold text-[#0d101b]">New Registration</h3>
                                <p className="text-[#4c599a] text-sm leading-relaxed">Register a new vehicle for the first time in Plateau State.</p>
                            </div>
                        </div>
                    </StaggerItem>

                    {/* Card 4 */}
                    <StaggerItem>
                        <div className="group flex flex-col gap-4 p-6 rounded-2xl border border-[#cfd3e7] bg-white hover:border-plateau-green/50 transition-all hover:shadow-lg cursor-pointer" role="button" tabIndex={0} aria-label="Agent portal access">
                            <div className="size-12 rounded-xl bg-plateau-green/10 text-plateau-green flex items-center justify-center group-hover:bg-plateau-green group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined" aria-hidden="true">support_agent</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold text-[#0d101b]">Agent Portal</h3>
                                <p className="text-[#4c599a] text-sm leading-relaxed">Specialized tools for authorized insurance agents and PSIRS staff.</p>
                            </div>
                        </div>
                    </StaggerItem>
                </StaggerContainer>

                {/* Trust / CTA Banner */}
                <section className="mb-20">
                    <div className="bg-gradient-to-r from-background-dark to-[#1a1f35] rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <span className="material-symbols-outlined text-[120px]">verified_user</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold">Safe & Secure Transactions</h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                All payments are processed through encrypted gateways approved by the Central Bank of Nigeria. Your data is protected by industry-standard security protocols.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-plateau-green">check_circle</span>
                                    <span className="font-medium">SSL Encrypted</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-plateau-green">check_circle</span>
                                    <span className="font-medium">24/7 Support</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-plateau-green">check_circle</span>
                                    <span className="font-medium">Instant Certificate</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
