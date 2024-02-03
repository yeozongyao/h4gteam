import { useRef, useState } from "react";
import { signup, useAuth, logout, login } from "../firebase";
import NavBar from '../components/NavBar';
import '../css/signin.css'; // Ensure this is the correct path to your CSS file

export default function signin() {
    const [ loading, setLoading ] = useState(false);
    const currentUser = useAuth();
    
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSignup() {
        setLoading(true);
        try {
          await signup(emailRef.current.value, passwordRef.current.value);
          // Successful sign up
        } catch {
            alert("Error!");
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
        <div id="main" className="signin-container"> 
            <NavBar name = "Account"/>


            <div>Currently logged in as: { currentUser?.email } </div> 
            
            <div id="fields">
            <input className="input-1" ref={emailRef} placeholder="Email" />
            <input className="input-1" ref={passwordRef} type="password" placeholder="Password" />

            </div>
            <div className="buttonsaccount">
            <button className="button-40" disabled={ loading || currentUser } onClick={handleSignup} >Sign Up</button>
            <button className="button-40" disabled={ loading || currentUser } onClick={handleLogin} >Log In</button>
            <button className="button-40" disabled={ loading || !currentUser } onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
}