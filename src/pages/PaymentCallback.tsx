
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import paymentService from '../services/payment.service';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function PaymentCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const processedRef = useRef(false);

    useEffect(() => {
        const verify = async () => {
            const reference = searchParams.get('reference') || searchParams.get('trxref');

            if (!reference) {
                toast.error('Invalid payment reference');
                navigate('/checkout');
                return;
            }

            if (processedRef.current) return;
            processedRef.current = true;

            try {
                const response = await paymentService.verifyPayment(reference);

                if (response.success && response.data?.status === 'SUCCESS') {
                    toast.success('Payment successful!');
                    navigate('/receipt', {
                        state: {
                            transactionId: response.data.transaction.id,
                            transaction: response.data.transaction
                        }
                    });
                } else {
                    toast.error(response.message || 'Payment verification failed');
                    navigate('/checkout');
                }
            } catch (error) {
                console.error('Verification error:', error);
                toast.error('Failed to verify payment');
                navigate('/checkout');
            }
        };

        verify();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <LoadingSpinner className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-xl font-bold text-slate-800">Verifying Payment...</h2>
            <p className="text-slate-500 mt-2">Please wait while we confirm your transaction.</p>
        </div>
    );
}
