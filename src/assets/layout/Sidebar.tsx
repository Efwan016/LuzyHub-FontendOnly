import { Link } from "react-router-dom";

interface SidebarProps {
    isSidebarOpen: boolean;
    isDesktopSidebarOpen?: boolean;
}

export default function Sidebar({ isSidebarOpen, isDesktopSidebarOpen = true }: SidebarProps) {
    return (
        <aside className={`fixed z-50 w-[300px] h-full bg-[#0a0a0a] border-r border-[#1F1F1F] transition-transform duration-300 ease-in-out ${isDesktopSidebarOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

            <div className="flex flex-col p-[30px] pr-0 overflow-y-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Link to="/" className="logo mb-10 items-center flex gap-4 justify-center pr-[30px]">
                    <img src="/images/luzyhub-white.svg" alt="LuzyHub" />
                </Link>
                <div className="links flex flex-col mt-[60px] h-full gap-[50px]">

                    { /* Menu */}
                    <div>
                        <div className="text-gray-500 text-xs font-medium mb-6 uppercase tracking-wider">Category</div>
                        <Link to="/" className="flex items-center gap-4 text-white font-semibold mb-8 border-r-2 border-alerange pr-5 transition-all">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="Iconly/Bulk/Home">
                                    <g id="Home">
                                        <path id="Home_2"
                                            d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V17.7152V20.7732C14.8563 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" />
                                    </g>
                                </g>
                            </svg>
                            Home
                        </Link>
                        <Link to="/category/kdrama" className="flex items-center gap-4 text-gray-400 hover:text-white transition-all mb-8">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M15.8498 2.50071C16.4808 2.50071 17.1108 2.58971 17.7098 2.79071C21.4008 3.99071 22.7308 8.04071 21.6198 11.5807C20.9898 13.3897 19.9598 15.0407 18.6108 16.3897C16.6798 18.2597 14.5608 19.9197 12.2798 21.3497L12.0298 21.5007L11.7698 21.3397C9.48077 19.9197 7.34977 18.2597 5.40077 16.3797C4.06077 15.0307 3.02977 13.3897 2.38977 11.5807C1.25977 8.04071 2.58977 3.99071 6.32077 2.76971C6.61077 2.66971 6.90977 2.59971 7.20977 2.56071H7.32977C7.61077 2.51971 7.88977 2.50071 8.16977 2.50071H8.27977C8.90977 2.51971 9.51977 2.62971 10.1108 2.83071H10.1698C10.2098 2.84971 10.2398 2.87071 10.2598 2.88971C10.4808 2.96071 10.6898 3.04071 10.8898 3.15071L11.2698 3.32071C11.3616 3.36968 11.4647 3.44451 11.5537 3.50918C11.6102 3.55015 11.661 3.58705 11.6998 3.61071C11.7161 3.62034 11.7327 3.63002 11.7494 3.63978C11.8351 3.68983 11.9245 3.74197 11.9998 3.79971C13.1108 2.95071 14.4598 2.49071 15.8498 2.50071ZM18.5098 9.70071C18.9198 9.68971 19.2698 9.36071 19.2998 8.93971V8.82071C19.3298 7.41971 18.4808 6.15071 17.1898 5.66071C16.7798 5.51971 16.3298 5.74071 16.1798 6.16071C16.0398 6.58071 16.2598 7.04071 16.6798 7.18971C17.3208 7.42971 17.7498 8.06071 17.7498 8.75971V8.79071C17.7308 9.01971 17.7998 9.24071 17.9398 9.41071C18.0798 9.58071 18.2898 9.67971 18.5098 9.70071Z" />
                            </svg>
                            K-Drama
                        </Link>
                        <Link to="/category/anime" className="flex items-center gap-4 text-gray-400 hover:text-white transition-all mb-8">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M13.4499 4.8802H16.5199C20.2099 4.8802 22.0099 6.8502 21.9999 10.8902V15.7602C21.9999 19.6202 19.6199 22.0002 15.7499 22.0002H8.23988C4.38988 22.0002 1.99988 19.6202 1.99988 15.7502V8.2402C1.99988 4.1002 3.83988 2.0002 7.46988 2.0002H9.04988C9.98088 1.9902 10.8499 2.4202 11.4199 3.1502L12.2999 4.3202C12.5799 4.6702 12.9999 4.8802 13.4499 4.8802ZM7.36988 15.2902H16.6299C17.0399 15.2902 17.3699 14.9502 17.3699 14.5402C17.3699 14.1202 17.0399 13.7902 16.6299 13.7902H7.36988C6.94988 13.7902 6.61988 14.1202 6.61988 14.5402C6.61988 14.9502 6.94988 15.2902 7.36988 15.2902Z" />
                            </svg>
                            Anime
                        </Link>
                        <Link to="/category/short-tv" className="flex items-center gap-4 text-gray-400 hover:text-white transition-all mb-0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.93 6.36l-2.14.62-.92-2.02 1.47-1.47c.78.95 1.33 2.06 1.59 3.07zm-1.9 4.86l-1.59 1.59-.92-2.44 1.9-1.1c.28.65.49 1.33.61 1.95zm-4.03 5.73c-.52-.33-.96-.76-1.28-1.28l-2.44.92 1.59 1.59c.62-.12 1.3-.33 1.95-.61zm-6.03-6.59l2.14-.62.92 2.02-1.47 1.47c-.78-.95-1.33-2.06-1.59-3.07zm1.9-4.86l1.59-1.59.92 2.44-1.9 1.1c-.28-.65-.49-1.33-.61-1.95zm4.03-5.73c.52.33.96.76 1.28 1.28l2.44-.92-1.59-1.59c-.62.12-1.3.33-1.95.61z" />
                            </svg>
                            Short-TV
                        </Link>
                        

                    </div>
                    { /* ./Menu */}

                    {/* Others */}
                    {/* ./Others */}

                    {/* Subscription details */}

                    {/* ./Subscription details */}

                </div>
            </div>
        </aside>
    )
}