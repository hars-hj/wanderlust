import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) return null;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          WonderLust
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          
          <Link to="/listings" className="hover:text-black">Listings</Link>

          {user && (
            <Link to="/listings/new" className="hover:text-black">
              Add Property
            </Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-black transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
