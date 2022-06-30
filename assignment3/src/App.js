import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isauthenticated, setIsauthenticated] = useState(false);
  console.log("isauthenticated: ", isauthenticated);

  useEffect(() => {
    const isUser = localStorage.getItem("user");

    if (isUser) {
      setIsauthenticated(true);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home isauthenticated={isauthenticated} />} />
        <Route
          path="/login"
          element={
            <Login
              isauthenticated={isauthenticated}
              setIsauthenticated={setIsauthenticated}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              isauthenticated={isauthenticated}
              setIsauthenticated={setIsauthenticated}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
