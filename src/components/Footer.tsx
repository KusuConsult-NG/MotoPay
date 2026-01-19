import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-[#0a0c16] border-t border-[#e7e9f3] dark:border-white/5 py-16">
            <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="size-8 flex items-center justify-center bg-plateau-green rounded text-white">
                            <span className="material-symbols-outlined text-xl text-white">account_balance</span>
                        </div>
                        <span className="text-xl font-bold dark:text-white">MotoPay</span>
                    </div>
                    <p className="text-[#4c599a] dark:text-white/60 text-sm">
                        The official digital gateway for Plateau State vehicle revenue and insurance management.
                    </p>
                    <div className="flex gap-4">
                        <a className="size-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="https://plateaustate.gov.ng" target="_blank" rel="noopener noreferrer">
                            <span className="material-symbols-outlined text-sm">public</span>
                        </a>
                        <a className="size-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="mailto:support@motopay.pl.gov.ng">
                            <span className="material-symbols-outlined text-sm">mail</span>
                        </a>
                        <a className="size-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="tel:+2340800000000">
                            <span className="material-symbols-outlined text-sm">call</span>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="font-bold text-[#0d101b] dark:text-white uppercase tracking-wider text-xs">Services</h4>
                    <div className="flex flex-col gap-4 text-sm text-[#4c599a] dark:text-white/60">
                        <Link className="hover:text-primary transition-colors" to="/lookup">Private Renewals</Link>
                        <Link className="hover:text-primary transition-colors" to="/commercial">Commercial Permits</Link>
                        <Link className="hover:text-primary transition-colors" to="/lookup">Insurance Verification</Link>
                        <Link className="hover:text-primary transition-colors" to="/lookup">Plate Number Search</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="font-bold text-[#0d101b] dark:text-white uppercase tracking-wider text-xs">Governance</h4>
                    <div className="flex flex-col gap-4 text-sm text-[#4c599a] dark:text-white/60">
                        <a className="hover:text-primary transition-colors" href="https://psirs.gov.ng" target="_blank" rel="noopener noreferrer">PSIRS Portal</a>
                        <a className="hover:text-primary transition-colors" href="https://plateaustate.gov.ng" target="_blank" rel="noopener noreferrer">State Government</a>
                        <Link className="hover:text-primary transition-colors" to="/help">Tax Laws</Link>
                        <Link className="hover:text-primary transition-colors" to="/help">Download Forms</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="font-bold text-[#0d101b] dark:text-white uppercase tracking-wider text-xs">Need Help?</h4>
                    <p className="text-sm text-[#4c599a] dark:text-white/60">Our support team is available Monday to Friday, 8am - 5pm.</p>
                    <div className="flex flex-col gap-2">
                        <a href="tel:+2340800000000" className="text-sm font-bold text-primary hover:underline">0800-PLATEAU-TAX</a>
                        <a href="mailto:support@motopay.pl.gov.ng" className="text-sm font-bold text-primary hover:underline">support@motopay.pl.gov.ng</a>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-6 mt-16 pt-8 border-t border-[#e7e9f3] dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-[#4c599a] dark:text-white/40">
                    © 2024 Plateau State Internal Revenue Service. All rights reserved.
                </p>
                <div className="flex gap-6 text-xs text-[#4c599a] dark:text-white/40">
                    <Link className="hover:underline" to="/help">Privacy Policy</Link>
                    <Link className="hover:underline" to="/help">Terms of Service</Link>
                    <Link className="hover:underline" to="/help">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
}
