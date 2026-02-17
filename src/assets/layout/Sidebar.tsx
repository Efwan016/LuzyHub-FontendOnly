import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
    isSidebarOpen: boolean;
    isDesktopSidebarOpen?: boolean;
}

export default function Sidebar({ isSidebarOpen, isDesktopSidebarOpen = true }: SidebarProps) {
    const location = useLocation();

    const menuItems = [
        {
            name: "Home",
            path: "/",
            icon: (
                <g id="Iconly/Bulk/Home">
                    <g id="Home">
                        <path id="Home_2"
                            d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V17.7152V20.7732C14.8563 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" />
                    </g>
                </g>
            )
        },
        {
            name: "K-Drama",
            path: "/category/kdrama",
            icon: (
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M15.8498 2.50071C16.4808 2.50071 17.1108 2.58971 17.7098 2.79071C21.4008 3.99071 22.7308 8.04071 21.6198 11.5807C20.9898 13.3897 19.9598 15.0407 18.6108 16.3897C16.6798 18.2597 14.5608 19.9197 12.2798 21.3497L12.0298 21.5007L11.7698 21.3397C9.48077 19.9197 7.34977 18.2597 5.40077 16.3797C4.06077 15.0307 3.02977 13.3897 2.38977 11.5807C1.25977 8.04071 2.58977 3.99071 6.32077 2.76971C6.61077 2.66971 6.90977 2.59971 7.20977 2.56071H7.32977C7.61077 2.51971 7.88977 2.50071 8.16977 2.50071H8.27977C8.90977 2.51971 9.51977 2.62971 10.1108 2.83071H10.1698C10.2098 2.84971 10.2398 2.87071 10.2598 2.88971C10.4808 2.96071 10.6898 3.04071 10.8898 3.15071L11.2698 3.32071C11.3616 3.36968 11.4647 3.44451 11.5537 3.50918C11.6102 3.55015 11.661 3.58705 11.6998 3.61071C11.7161 3.62034 11.7327 3.63002 11.7494 3.63978C11.8351 3.68983 11.9245 3.74197 11.9998 3.79971C13.1108 2.95071 14.4598 2.49071 15.8498 2.50071ZM18.5098 9.70071C18.9198 9.68971 19.2698 9.36071 19.2998 8.93971V8.82071C19.3298 7.41971 18.4808 6.15071 17.1898 5.66071C16.7798 5.51971 16.3298 5.74071 16.1798 6.16071C16.0398 6.58071 16.2598 7.04071 16.6798 7.18971C17.3208 7.42971 17.7498 8.06071 17.7498 8.75971V8.79071C17.7308 9.01971 17.7998 9.24071 17.9398 9.41071C18.0798 9.58071 18.2898 9.67971 18.5098 9.70071Z" />
            )
        },
        {
            name: "Anime",
            path: "/category/anime",
            icon: (
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M13.4499 4.8802H16.5199C20.2099 4.8802 22.0099 6.8502 21.9999 10.8902V15.7602C21.9999 19.6202 19.6199 22.0002 15.7499 22.0002H8.23988C4.38988 22.0002 1.99988 19.6202 1.99988 15.7502V8.2402C1.99988 4.1002 3.83988 2.0002 7.46988 2.0002H9.04988C9.98088 1.9902 10.8499 2.4202 11.4199 3.1502L12.2999 4.3202C12.5799 4.6702 12.9999 4.8802 13.4499 4.8802ZM7.36988 15.2902H16.6299C17.0399 15.2902 17.3699 14.9502 17.3699 14.5402C17.3699 14.1202 17.0399 13.7902 16.6299 13.7902H7.36988C6.94988 13.7902 6.61988 14.1202 6.61988 14.5402C6.61988 14.9502 6.94988 15.2902 7.36988 15.2902Z" />
            )
        },
        {
            name: "Short-TV",
            path: "/category/short-tv",
            icon: <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
        },
        {
            name: "Indonesian Movie",
            path: "/category/indonesian-movies",
            icon: <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
        },
        {
            name: "Western-TV",
            path: "/category/western-tv",
            icon: <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
        },
        {
            name: "Comedy",
            path: "/category/adult-comedy",
            icon: <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        },
    ];

    return (
        <aside className={`fixed z-50 w-[300px] h-full bg-[#0a0a0a] border-r border-[#1F1F1F] transition-transform duration-300 ease-in-out ${isDesktopSidebarOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

            <div className="flex flex-col h-full">
                {/* Logo Area */}
                <div className="h-24 flex items-center px-8">
                    <Link to="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105">
                        <img
                            src="./images/luzyhub-white.svg"
                            alt="LuzyHub"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto px-4 pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    
                    <div className="mb-8">
                        <div className="text-gray-500 text-xs font-bold mb-4 px-4 uppercase tracking-wider">Menu</div>
                        <div className="flex flex-col gap-1">
                            {menuItems.map((item) => {
                                const active = item.path === "/" 
                                    ? location.pathname === "/" 
                                    : location.pathname.startsWith(item.path);
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                            active 
                                                ? "bg-red-600 text-white shadow-lg shadow-red-600/20 font-semibold" 
                                                : "text-gray-400 hover:bg-[#1F1F1F] hover:text-white"
                                        }`}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={`transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-110"}`}>
                                            {item.icon}
                                        </svg>
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}