import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from 'react-avatar';
import "./NavBar.css"
function NavBar() {
    const [userLogged, setUserLogged] = useState(false);
    const navigate = useNavigate();
    const username = localStorage.getItem("name");
    useEffect(() => {
        const token = localStorage.getItem("token");
        setUserLogged(token);
    }, []);

    const logout = () => {
        let userConfirmation = window.confirm("Are you sure you want to logout?");
        if (userConfirmation) {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            setUserLogged(false);
            alert("Logged out successfully!");
            navigate("/login");
        }
    };

    return (
        <nav className="nav-bar">
            <ul>
                <li>Library-Management-System</li>
            </ul>
            <ul className="nav-links">
                {!userLogged ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/books">Books</Link></li>
                        <li><button onClick={logout} className="logout-button">Logout</button></li>
                        {/* <li style={{padding:'10px 12px',borderRadius:"5px",background:"dodgerblue",fontSize:"1.1rem",fontWeight:"bold"}}>{username}</li> */}
                        {/* <Avatar name="Foo Bar" round={true} size='100' /> */}
                        <Avatar name={username} size={40}  round={true} textSizeRatio={1.4} />
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
