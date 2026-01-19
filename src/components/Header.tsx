import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-solid border-[#e7e9f3] bg-white/80 backdrop-blur-md">
            <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-4">
                    <div className="size-10 flex items-center justify-center bg-plateau-green rounded-lg text-white">
                        <span className="material-symbols-outlined text-2xl">account_balance</span>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-[#0d101b] text-lg font-bold leading-none tracking-tight">MotoPay</h2>
                        <span className="text-[10px] uppercase font-bold text-plateau-green tracking-wider">Plateau State PSIRS</span>
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <a className="text-[#0d101b] text-sm font-medium hover:text-primary transition-colors" href="#services">Services</a>
                    <a className="text-[#0d101b] text-sm font-medium hover:text-primary transition-colors" href="#about">About</a>
                    <a className="text-[#0d101b] text-sm font-medium hover:text-primary transition-colors" href="#contact">Contact</a>
                    <a className="text-[#0d101b] text-sm font-medium hover:text-primary transition-colors" href="#help">Help</a>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/login" className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90">
                        Login
                    </Link>
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#e7e9f3] text-[#0d101b] text-sm font-bold transition-all hover:bg-[#d1d5db]">
                        Sign Up
                    </button>
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-plateau-green"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCaSuiHbfbJ1dne9RWVGO2BrQybXHiUOI73V5FqERukMmxO3Df68EoELgFY08o1BqL9wFkxmGYvZEUpVTjGYboR0Q33192RWgCnbPMBwN7ecGH8TKyHOAG4GNwxi8zH0ecox9ke1jUq4gYYeD50dtqlEPBIi50LJv7CItTJLGXsEuOXcNJ4s2kqFmXnv5zI7JgNWAQeje6vHfmzkqHgmNjgJDM94CgWYxSJL5pqjLBwTX-eczmOQFNE6MtoMCnDhlCbcFTm13vvNY")' }}
                        aria-label="Plateau State Coat of Arms"
                    />
                </div>
            </div>
        </header>
    );
}
