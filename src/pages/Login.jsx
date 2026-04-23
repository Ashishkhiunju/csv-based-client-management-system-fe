import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import appConfig from "../config/appConfig";

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl = appConfig.baseURL;

  const handleLogin = async () => {
    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      dispatch(login({ token: data.token, user: data.user }));
      window.location.href = "/";
    } else {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "30px",
    width: "300px",
    border: "1px solid #eee",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
};

export default Login;