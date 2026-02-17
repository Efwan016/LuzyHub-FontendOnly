import { useState, useEffect, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";

interface AuthenticatedProps {
    children: ReactNode;
}

export default function Authenticated({ children }: AuthenticatedProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleSidebar = () => {
        if (window.innerWidth >= 1024) {
            setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
        } else {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#141414] text-white font-sans selection:bg-[#E50914] selection:text-white">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} isDesktopSidebarOpen={isDesktopSidebarOpen} />

            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Wrapper */}
            <div 
                className={`transition-all duration-300 ease-in-out ${isDesktopSidebarOpen ? 'lg:ml-[300px]' : 'lg:ml-0'}`}
            >
                
                {/* Sticky Header */}
                <header 
                    className={`sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-500 ${
                        isScrolled ? 'bg-[#141414]/90 backdrop-blur-md shadow-md border-b border-white/5' : 'bg-transparent'
                    }`}
                >
                    <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} isDesktopSidebarOpen={isDesktopSidebarOpen} />
                </header>

                {/* Page Content */}
                <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-8 min-h-[calc(100vh-88px)]">
                    <main className="flex flex-col gap-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}