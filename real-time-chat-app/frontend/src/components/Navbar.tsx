import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { MessageCircle } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore(); // Get the authUser state from your store and logout action

  const handleLogout = () => {
    logout(); // Call the logout function from your store
  };

  return (
    <nav className="bg-base-100 text-base-content flex justify-center items-center h-[4rem]  border-b border-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-grow">
        {/* Logo */}
        <div className="text-xl font-bold flex justify-center items-center gap-x-2">
        <MessageCircle className="text-blue-500" size={32}/>
          <Link to="/" className="hover:text-primary">
            MyApp
          </Link>
        </div>

        {/* Menu */}
        <div className="hidden md:flex space-x-4">
          {authUser ? (
            // If logged in, show Profile, Settings, and Logout links
            <>
              <Link to="/profile" className="btn btn-ghost hover:text-primary">
                Profile
              </Link>
              <Link to="/settings" className="btn btn-ghost hover:text-primary">
                Settings
              </Link>
              <button onClick={handleLogout} className="btn btn-ghost hover:text-primary">
                Logout
              </button>
            </>
          ) : (
            // If not logged in, show Login and Signup links
            <>
              <Link to="/login" className="btn btn-ghost hover:text-primary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-ghost hover:text-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="btn btn-ghost text-xl">☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden mt-4">
        {authUser ? (
          <>
            <Link to="/profile" className="block py-2 px-4 btn btn-ghost hover:bg-primary">
              Profile
            </Link>
            <Link to="/settings" className="block py-2 px-4 btn btn-ghost hover:bg-primary">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block py-2 px-4 btn btn-ghost hover:bg-primary"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="block py-2 px-4 btn btn-ghost hover:bg-primary">
              Login
            </Link>
            <Link to="/signup" className="block py-2 px-4 btn btn-ghost hover:bg-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
