import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <nav>
      <strong>My App</strong>

      <Link to="/">Home</Link>
      <Link to="/readme">Readme</Link>

      <div style={{ marginLeft: "auto", display: "flex", gap: "10px", alignItems: "center" }}>
        {user && (
          <span>
            👤 {user.name} ({user.email})
          </span>
        )}

        <button onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;