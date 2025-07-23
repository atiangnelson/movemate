import { Link , useNavigate } from  "react-router-dom";
import "./Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/");
    };
}