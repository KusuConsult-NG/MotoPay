import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import AnimatedButton from '../components/ui/AnimatedButton';

export default function Checkout() {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'ussd'>('card');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvv: ''
    });

    const handlePayment = () => {
        // In a real app, this would process the payment
        navigate('/receipt');
    };

    return (
        <PageTransition>
            <div className="px-6 lg:px-40 py-10">
                <div className="max-w-[1200px] mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 mb-6">
                        <a className="text-[#4c599a] text-sm font-medium hover:text-primary" href="#">Transaction Summary</a>
                        <span className="text-[#4c599a] material-symbols-outlined text-sm">chevron_right</span>
                        <span className="text-primary text-sm font-bold">Payment Methods</span>
                    </div>

                    {/* Page Title */}
                    <h1 className="text-[#0d101b] text-4xl font-bold mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Left Column: Payment Methods */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <section className="bg-white p-6 rounded-xl border border-[#cfd3e7] shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-[#0d101b]">Select Payment Method</h3>
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4c599a]">
                                        <span className="material-symbols-outlined text-sm">verified_user</span>
                                        Secure Payment
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {/* Card Option */}
                                    <label className={`flex items-start gap-4 rounded-xl border-2 p-5 cursor-pointer transition-all ${paymentMethod === 'card'
                                        ? 'border-primary bg-primary/5'
                                        : 'border-[#cfd3e7] hover:bg-gray-50'
                                        }`}>
                                        <input
                                            checked={paymentMethod === 'card'}
                                            className="mt-1 h-5 w-5 border-2 border-[#cfd3e7] bg-transparent text-primary focus:outline-none focus:ring-0"
                                            name="payment_method"
                                            type="radio"
                                            onChange={() => setPaymentMethod('card')}
                                        />
                                        <div className="flex grow flex-col">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-[#0d101b] text-base font-bold">Debit/Credit Card</p>
                                                <div className="flex gap-1">
                                                    <span className="material-symbols-outlined text-[#4c599a]">credit_card</span>
                                                </div>
                                            </div>
                                            <p className="text-[#4c599a] text-sm leading-relaxed">
                                                Pay securely with your Visa, Mastercard or Verve card. All transactions are encrypted.
                                            </p>

                                            {paymentMethod === 'card' && (
                                                <div className="mt-6 pt-6 border-t border-[#cfd3e7] grid grid-cols-2 gap-4">
                                                    <label className="flex flex-col col-span-2">
                                                        <p className="text-[#0d101b] text-sm font-semibold pb-2">Card Number</p>
                                                        <input
                                                            className="form-input w-full rounded-lg text-[#0d101b] border border-[#cfd3e7] bg-[#f8f9fc] h-12 px-4 text-sm focus:border-primary focus:ring-0"
                                                            placeholder="0000 0000 0000 0000"
                                                            value={cardDetails.number}
                                                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                        />
                                                    </label>
                                                    <label className="flex flex-col">
                                                        <p className="text-[#0d101b] text-sm font-semibold pb-2">Expiry Date</p>
                                                        <input
                                                            className="form-input w-full rounded-lg text-[#0d101b] border border-[#cfd3e7] bg-[#f8f9fc] h-12 px-4 text-sm focus:border-primary focus:ring-0"
                                                            placeholder="MM/YY"
                                                            value={cardDetails.expiry}
                                                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                        />
                                                    </label>
                                                    <label className="flex flex-col">
                                                        <p className="text-[#0d101b] text-sm font-semibold pb-2">CVV</p>
                                                        <input
                                                            className="form-input w-full rounded-lg text-[#0d101b] border border-[#cfd3e7] bg-[#f8f9fc] h-12 px-4 text-sm focus:border-primary focus:ring-0"
                                                            placeholder="123"
                                                            value={cardDetails.cvv}
                                                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </label>

                                    {/* Bank Transfer Option */}
                                    <label className={`flex items-start gap-4 rounded-xl border p-5 cursor-pointer transition-all ${paymentMethod === 'bank'
                                        ? 'border-2 border-primary bg-primary/5'
                                        : 'border border-[#cfd3e7] hover:bg-gray-50'
                                        }`}>
                                        <input
                                            checked={paymentMethod === 'bank'}
                                            className="mt-1 h-5 w-5 border-2 border-[#cfd3e7] bg-transparent text-primary focus:outline-none focus:ring-0"
                                            name="payment_method"
                                            type="radio"
                                            onChange={() => setPaymentMethod('bank')}
                                        />
                                        <div className="flex grow flex-col">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-[#0d101b] text-base font-bold">Bank Transfer</p>
                                                <span className="material-symbols-outlined text-[#4c599a]">account_balance</span>
                                            </div>
                                            <p className="text-[#4c599a] text-sm leading-relaxed">
                                                Generate a dynamic one-time account number for your mobile transfer.
                                            </p>
                                        </div>
                                    </label>

                                    {/* USSD Option */}
                                    <label className={`flex items-start gap-4 rounded-xl border p-5 cursor-pointer transition-all ${paymentMethod === 'ussd'
                                        ? 'border-2 border-primary bg-primary/5'
                                        : 'border border-[#cfd3e7] hover:bg-gray-50'
                                        }`}>
                                        <input
                                            checked={paymentMethod === 'ussd'}
                                            className="mt-1 h-5 w-5 border-2 border-[#cfd3e7] bg-transparent text-primary focus:outline-none focus:ring-0"
                                            name="payment_method"
                                            type="radio"
                                            onChange={() => setPaymentMethod('ussd')}
                                        />
                                        <div className="flex grow flex-col">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-[#0d101b] text-base font-bold">USSD Code</p>
                                                <span className="material-symbols-outlined text-[#4c599a]">dialpad</span>
                                            </div>
                                            <p className="text-[#4c599a] text-sm leading-relaxed">
                                                Dial a short code from your registered phone number to complete the payment.
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </section>

                            {/* PSIRS Branding / Security Notice */}
                            <div className="flex items-center gap-6 p-4 rounded-xl border border-dashed border-[#cfd3e7]">
                                <div className="h-12 w-12 bg-plateau-green/10 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-plateau-green">verified_user</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#0d101b]">Authorized Payment Gateway</p>
                                    <p className="text-xs text-[#4c599a]">
                                        This payment is processed by the Plateau State Internal Revenue Service (PSIRS) secure portal.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Transaction Summary Sidebar */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-10 bg-white p-8 rounded-xl border border-[#cfd3e7] shadow-lg">
                                <h3 className="text-xl font-bold mb-6 text-[#0d101b]">Transaction Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between">
                                        <span className="text-[#4c599a] text-sm">Vehicle License Renewal</span>
                                        <span className="text-[#0d101b] text-sm font-semibold">₦12,500.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[#4c599a] text-sm">Statutory Insurance</span>
                                            <span className="text-[10px] text-primary font-bold uppercase tracking-tight">Standard Rate</span>
                                        </div>
                                        <span className="text-[#0d101b] text-sm font-semibold">₦5,000.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#4c599a] text-sm">Platform Fee</span>
                                        <span className="text-[#0d101b] text-sm font-semibold">₦250.00</span>
                                    </div>
                                </div>

                                <div className="border-t-2 border-dashed border-[#cfd3e7] my-6 pt-6">
                                    <div className="flex justify-between items-end">
                                        <p className="text-[#4c599a] font-bold text-sm uppercase">Total Payable</p>
                                        <p className="text-3xl font-black text-primary">₦17,750.00</p>
                                    </div>
                                </div>

                                <AnimatedButton
                                    onClick={handlePayment}
                                    variant="primary"
                                    size="lg"
                                    className="w-full flex items-center justify-center gap-2 mb-4"
                                >
                                    Pay Now
                                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                </AnimatedButton>

                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="flex items-center gap-1.5 text-[#4c599a] text-xs">
                                        <span className="material-symbols-outlined text-sm">lock</span>
                                        Secure 256-bit SSL Encrypted Payment
                                    </div>
                                    <div className="flex gap-4 mt-2 opacity-60">
                                        <span className="text-[10px] font-bold">VISA</span>
                                        <span className="text-[10px] font-bold">MASTERCARD</span>
                                        <span className="text-[10px] font-bold">VERVE</span>
                                    </div>
                                </div>
                            </div>

                            {/* Helpful Links */}
                            <div className="mt-6 px-4">
                                <p className="text-xs text-[#4c599a] mb-2 font-semibold">Need help with your payment?</p>
                                <div className="flex flex-wrap gap-4">
                                    <a className="text-primary text-xs font-medium hover:underline" href="#">Payment Policy</a>
                                    <a className="text-primary text-xs font-medium hover:underline" href="#">Contact Support</a>
                                    <a className="text-primary text-xs font-medium hover:underline" href="#">FAQs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
