import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#0d101b] dark:text-white">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
