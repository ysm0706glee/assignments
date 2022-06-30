import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ isauthenticated, setIsauthenticated }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      if (res.data) {
        localStorage.setItem(
          "user",
          JSON.stringify({ userId: res.data.userId, isauthenticated: true })
        );
        setIsauthenticated(true);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isauthenticated) {
      navigate("/");
    }
  }, [isauthenticated, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};

export default Login;
