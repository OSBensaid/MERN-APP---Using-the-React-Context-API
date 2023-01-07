import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { UseLogout } from "../hooks/useLogout";

function Navbar() {
  const { logout } = UseLogout();
  const { user } = useAuthContext();
  const handleLogout = async () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Budget Pro</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
