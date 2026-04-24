import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import appConfig from "../config/appConfig";

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = appConfig.baseURL;

  const handleLogin = async () => {
    setLoading(true); 
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
     setLoading(false); 
  };

  const handleReadmeLink = () =>{
     window.open("http://127.0.0.1:8000/readme", "_blank");
  }

  return (
    <div style={styles.container}>
      <div style={styles.cardWrapper}>

        {/* 🔴 Info box ABOVE login */}
        <div style={styles.infoBox}>
          <p><b>Demo Credentials</b></p>
          <p>Email: Administrator</p>
          <p>Password: admin</p>

          <div style={{ marginTop: "10px" }}>
            <a onClick={handleReadmeLink} target="_blank" rel="noreferrer">
              📘 Readme
            </a>
            <br />
            
          </div>
        </div>

        {/* Login Card */}
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

          <button onClick={handleLogin} disabled={loading}>{loading?"Logging in":"Login"}</button>
        </div>

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

  cardWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },

  infoBox: {
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "10px",
    background: "#fafafa",
    width: "300px",
    textAlign: "center",
    fontSize: "14px",
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