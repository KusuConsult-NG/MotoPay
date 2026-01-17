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
                        <a className="size-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                            <span className="material-symbols-outlined text-sm">public</span>
                        </a>
                        <a className="size-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                            <span className="material-symbols-outlined text-sm">mail</span>
                        </a>
                        <a className="size-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                            <span className="material-symbols-outlined text-sm">call</span>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="font-bold text-[#0d101b] dark:text-white uppercase tracking-wider text-xs">Services</h4>
                    <div className="flex flex-col gap-4 text-sm text-[#4c599a] dark:text-white/60">
                        <a className="hover:text-primary transition-colors" href="#">Private Renewals</a>
                        <a className="hover:text-primary transition-colors" href="#">Commercial Permits</a>
                        <a className="hover:text-primary transition-colors" href="#">Insurance Verification</a>
                        <a className="hover:text-primary transition-colors" href="#">Plate Number Search</a>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="font-bold text-[#0d101b] dark:text-white uppercase tracking-wider text-xs">Governance</h4>
                    <div className="flex flex-col gap-4 text-sm text-[#4c599a] dark:text-white/60">
                        <a className="hover:text-primary transition-colors" href="#">PSIRS Portal</a>
                        <a className="hover:text-primary transition-colors" href="#">State Government</a>
                        <a className="hover:text-primary transition-colors" href="#">Tax Laws</a>
                        <a className="hover:text-primary transition-colors" href="#">Download Forms</a>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="font-bold text-[#0d101b] dark:text-white uppercase tracking-wider text-xs">Need Help?</h4>
                    <p className="text-sm text-[#4c599a] dark:text-white/60">Our support team is available Monday to Friday, 8am - 5pm.</p>
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-primary">0800-PLATEAU-TAX</span>
                        <span className="text-sm font-bold text-primary">support@motopay.pl.gov.ng</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-6 mt-16 pt-8 border-t border-[#e7e9f3] dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-[#4c599a] dark:text-white/40">
                    © 2024 Plateau State Internal Revenue Service. All rights reserved.
                </p>
                <div className="flex gap-6 text-xs text-[#4c599a] dark:text-white/40">
                    <a className="hover:underline" href="#">Privacy Policy</a>
                    <a className="hover:underline" href="#">Terms of Service</a>
                    <a className="hover:underline" href="#">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
}
