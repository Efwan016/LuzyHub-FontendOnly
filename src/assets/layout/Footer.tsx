import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0a0a0a] border-t border-[#1F1F1F] text-gray-400 text-sm">
            <div className="mx-auto px-4 sm:px-4 lg:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* About Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <img
                                src="/images/luzyhub-white.svg"
                                alt="LuzyHub"
                                className="h-8 w-auto object-contain"
                            />
                        </Link>
                        <p className="max-w-xs">
                            Platform streaming modern for movies, serial TV, K-Drama, dan anime your favorite.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-xl text-amber-600 mb-4">ShortCut</h3>
                        <ul className="space-y-2">
                            <li><Link to="/category/kdrama" className="hover:text-white transition-colors">K-Drama</Link></li>
                            <li><Link to="/category/anime" className="hover:text-white transition-colors">Anime</Link></li>
                            <li><Link to="/category/short-tv" className="hover:text-white transition-colors">Short TV</Link></li>
                            <li><Link to="/sports/match/:id" className="hover:text-white transition-colors">Live Football</Link></li>
                            <li><Link to="/category/western-tv" className="hover:text-white transition-colors">Movie</Link></li>
                        </ul>
                    </div>

                    {/* Disclaimer */}
                    <div>
                        <h3 className="font-semibold text-amber-600 text-xl mb-4">Disclaimer</h3>
                        <p>
                            This site does not store any files on its server. All content is provided by third parties that are not affiliated.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#1F1F1F] text-center">
                    <p>&copy; {currentYear} LuzyHub. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}