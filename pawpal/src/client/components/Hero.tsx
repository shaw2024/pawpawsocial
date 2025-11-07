import React from 'react';

const PawSVG: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <g fill="currentColor">
            <path d="M20 12c3 0 6 4 6 8s-3 8-6 8-6-4-6-8 3-8 6-8z" />
            <path d="M36 8c2.8 0 5 3.6 5 8s-2.2 8-5 8-5-3.6-5-8 2.2-8 5-8z" />
            <path d="M12 22c2 0 4.5 1.8 6 4s-.2 6-2.2 8-6 0-8-2-1.8-6 4.2-10z" />
            <path d="M48 24c2.4 0 4.8 2 6 4s.2 6-2 8-6 0-8-2-1.6-6 4-10z" />
            <path d="M30 34c6 0 10 6 10 12 0 8-6 18-16 18s-16-10-16-18c0-6 4-12 12-12 3 0 5 0 10 0z" />
        </g>
    </svg>
);

const Hero: React.FC = () => {
    return (
        <section className="w-full bg-gradient-to-r from-sky-100 via-amber-50 to-rose-50 py-12">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <PawSVG className="w-12 h-12 text-amber-600 transform -scale-x-1" />
                        <PawSVG className="w-12 h-12 text-amber-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-semibold text-slate-800">Where matching dogs bring their people together.</h1>
                    <p className="mt-3 text-slate-600">Share photos, stories, and find friends who love dogs as much as you do.</p>
                    <div className="mt-6">
                        <a href="/signup" className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg shadow">Join Now</a>
                    </div>
                </div>
                <div className="flex-1">
                    {/* simple decorative image area */}
                    <div className="w-full h-56 md:h-72 bg-white rounded-2xl shadow-lg flex items-center justify-center text-6xl text-rose-400">🐕🐾</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;