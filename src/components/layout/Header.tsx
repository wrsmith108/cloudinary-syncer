
import { Bell, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="border-b border-shopify-border bg-shopify-surface">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold">Cloudinary Sync</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-shopify-icon-default hover:text-shopify-text transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 text-shopify-icon-default hover:text-shopify-text transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>
        <nav className="flex space-x-6 -mb-px">
          <Link
            to="/"
            className={`nav-tab ${currentPath === "/" ? "active" : ""}`}
          >
            Folders
          </Link>
          <Link
            to="/sync-logs"
            className={`nav-tab ${currentPath === "/sync-logs" ? "active" : ""}`}
          >
            Sync Logs
          </Link>
          <Link
            to="/scheduled"
            className={`nav-tab ${currentPath === "/scheduled" ? "active" : ""}`}
          >
            Scheduled
          </Link>
          <Link
            to="/settings"
            className={`nav-tab ${currentPath === "/settings" ? "active" : ""}`}
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
