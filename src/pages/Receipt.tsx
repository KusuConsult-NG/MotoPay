import PageTransition from '../components/PageTransition';
import AnimatedButton from '../components/ui/AnimatedButton';

export default function Receipt() {
    return (
        <PageTransition>
            <div className="flex flex-1 justify-center py-10 px-4 md:px-0">
                <div className="layout-content-container flex flex-col max-w-[800px] flex-1">
                    {/* Success Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="size-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4 animate-bounce">
                            <span className="material-symbols-outlined !text-[48px]">check_circle</span>
                        </div>
                        <h1 className="text-[#0d101b] tracking-light text-[32px] font-extrabold leading-tight text-center">
                            Payment Successful
                        </h1>
                        <p className="text-[#4c599a] text-base font-normal leading-normal text-center mt-2 max-w-md">
                            Your vehicle levy and insurance payment has been processed securely through MotoPay.
                        </p>
                    </div>

                    {/* Digital Receipt Card */}
                    <div className="p-1">
                        <div className="flex flex-col rounded-xl shadow-lg border border-[#e7e9f3] bg-white overflow-hidden">
                            {/* Receipt Top Header */}
                            <div className="bg-[#f8fcf8] p-6 border-b border-dashed border-[#e7e9f3] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Receipt Issued</p>
                                    <h3 className="text-[#0d101b] text-xl font-bold">Transaction Receipt</h3>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex items-center justify-center rounded-lg h-9 w-9 bg-white border border-[#e7e9f3] text-[#4c599a] hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-sm">print</span>
                                    </button>
                                    <button className="flex items-center justify-center rounded-lg h-9 w-9 bg-white border border-[#e7e9f3] text-[#4c599a] hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-sm">share</span>
                                    </button>
                                </div>
                            </div>

                            {/* Receipt Details Body */}
                            <div className="p-6 md:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-1">
                                        <p className="text-[#4c599a] text-xs font-medium uppercase">Transaction Reference</p>
                                        <p className="text-[#0d101b] font-mono font-semibold">#PAY-99238-XYZ</p>
                                    </div>
                                    <div className="space-y-1 md:text-right">
                                        <p className="text-[#4c599a] text-xs font-medium uppercase">Date & Time</p>
                                        <p className="text-[#0d101b] font-semibold">
                                            {new Date().toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-primary/5 rounded-lg p-4 mb-8 flex items-center gap-4 border border-primary/10">
                                    <div className="bg-primary text-white rounded-lg p-2">
                                        <span className="material-symbols-outlined">directions_car</span>
                                    </div>
                                    <div>
                                        <p className="text-[#4c599a] text-xs font-medium uppercase">Vehicle Plate Number</p>
                                        <p className="text-[#0d101b] font-bold text-lg">PL-582-KN</p>
                                    </div>
                                </div>

                                {/* Payment Breakdown */}
                                <div className="border-t border-solid border-[#e7e9f3] pt-6 space-y-4">
                                    <h4 className="text-[#0d101b] font-bold text-sm mb-2">Breakdown of Payments</h4>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[#4c599a] text-sm">Vehicle License (Annual)</p>
                                        <p className="text-[#0d101b] text-sm font-semibold">₦12,500.00</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[#4c599a] text-sm">Statutory Insurance Premium</p>
                                        <p className="text-[#0d101b] text-sm font-semibold">₦5,000.00</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[#4c599a] text-sm">Processing Fee</p>
                                        <p className="text-[#0d101b] text-sm font-semibold">₦250.00</p>
                                    </div>
                                    <div className="border-t border-solid border-[#e7e9f3] pt-4 mt-2 flex justify-between items-center">
                                        <p className="text-[#0d101b] font-bold text-base">Total Amount Paid</p>
                                        <p className="text-primary font-extrabold text-xl">₦17,750.00</p>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-center">
                                    <div className="size-24 opacity-30 flex items-center justify-center">
                                        <div className="bg-plateau-green/20 rounded-full p-4">
                                            <span className="material-symbols-outlined text-4xl text-plateau-green">verified</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Alert Box */}
                    <div className="mx-1 mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3 items-start">
                        <span className="material-symbols-outlined text-amber-600 mt-0.5">info</span>
                        <div>
                            <p className="text-amber-800 text-sm font-bold">Documents pending validation</p>
                            <p className="text-amber-700 text-xs mt-1">
                                Your official digital stickers and certificates are currently being generated. They will be available for download within 24 hours once the validation process is completed.
                            </p>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 px-1">
                        <AnimatedButton variant="primary" size="lg" className="flex-1 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">download</span>
                            Download PDF Receipt
                        </AnimatedButton>
                        <AnimatedButton variant="secondary" size="lg" className="flex-1 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">verified_user</span>
                            View Insurance Policy
                        </AnimatedButton>
                    </div>

                    <div className="mt-12 mb-8 text-center">
                        <p className="text-[#4c599a] text-xs">
                            MotoPay is an official platform of the Plateau State Government Internal Revenue Service.
                        </p>
                        <div className="flex justify-center gap-4 mt-4 opacity-50">
                            <div className="text-xs font-bold text-slate-400">VISA</div>
                            <div className="text-xs font-bold text-slate-400">MASTERCARD</div>
                            <div className="text-xs font-bold text-slate-400">VERVE</div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
