import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
   
  };
  return (
    <div>
      Home
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}