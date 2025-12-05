import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} DataViz AI. From Data to Viz methodology.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Privacy</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Terms</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">About</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
