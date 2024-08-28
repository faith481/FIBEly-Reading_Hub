import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("/api/user/role"); // Adjust the URL to your backend
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        navigate("/home"); // Redirect in case of error
      }
    };

    fetchUserRole();
  }, [navigate]);

  useEffect(() => {
    if (userRole === "admin") {
      navigate("/admin");
    } else if (userRole) {
      navigate("/home");
      showNotification(
        "You were redirected because this is an admin-only page."
      );
    }
  }, [userRole, navigate]);

  return (
    <div>{userRole ? "Loading admin page..." : "Checking permissions..."}</div>
  );
};

export default AdminPage;
