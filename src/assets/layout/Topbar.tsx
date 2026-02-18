import { useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";

interface TopBarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  isDesktopSidebarOpen: boolean;
}

export default function TopBar({
  toggleSidebar,
  isSidebarOpen,
  isDesktopSidebarOpen,
}: TopBarProps) {

  const navigate = useNavigate();
  const location = useLocation();

  const queryFromUrl = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  }, [location.search]);

  const [keyword, setKeyword] = useState(queryFromUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = keyword.trim();
    if (!trimmed) return;

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="flex justify-between items-center w-full">
      
      <div className="flex items-center gap-4">

        <button
          className="text-white focus:outline-none"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search..."
            className="bg-[#464545] text-white rounded-full px-8 py-2 w-full focus:outline-none"
          />
        </form>

      </div>

    </div>
  );
}
