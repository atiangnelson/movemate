import { useState }  from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     if (formData.email && formData.password) {
        setIsLoggedIn(true);
        navigate("/dashboard");
    }
  };
  