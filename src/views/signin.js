import { useRef, useState } from "react";
import { signup, useAuth, logout, login, } from "../firebase";
import { useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../css/signin.css"; // Ensure this is the correct path to your CSS file


export default function signin() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();


  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      auth.onAuthStateChanged();
      history.push("/profiles");
    } catch (error) {
      alert("try again");
    }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      // Successful sign up
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  async function handleLogout() {
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <div className="signin-container">
        <NavBar name="Account" />
        
        <div>Currently logged in as: {currentUser?.email} </div>

        <br></br>
        {!currentUser && (
            <div id="fields">
                <input
                  className="input-1"
                  ref={emailRef}
                  placeholder="Email"
                  required
                />
                <input
                  className="input-1"
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                  required
                />
            </div>
      )}

      <div className="buttonsaccount">
        {!currentUser && (
          <button
            className="button-40"
            disabled={loading}
            onClick={handleSignup}
          >
            Sign Up
          </button>
        )}
        {!currentUser && (
          <button
            className="button-40"
            disabled={loading}
            onClick={handleLogin}
          >
            Log In
          </button>
        )}
        {currentUser && (
          <button
            className="button-40"
            disabled={loading}
            onClick={handleLogout}
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}
