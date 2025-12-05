import React from 'react';
import { BarChart3, Github } from 'lucide-react';
import ApiKeySettings from '../common/ApiKeySettings';

const Header = () => {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">DataViz AI</h1>
                            <p className="text-xs text-slate-500 font-medium">Intelligent Data Visualization</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ApiKeySettings />
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
