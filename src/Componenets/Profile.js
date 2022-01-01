import { Button } from "bootstrap";
import React from "react";
import { useAuth } from "../lib/auth";

const Profile = () => {
  const { logOut } = useAuth();
  return (
    <div>
      <button className="btn btn-danger mt-5" onClick={logOut}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
