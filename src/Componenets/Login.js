import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="container m-auto d-flex flex-column justify-content-center align-items-center"
    >
      <Link to="rider">
        <button className="btn btn-success mb-3">Join as a rider</button>
      </Link>
      <Link to="learner">
        <button className="btn btn-success">
          Join as a Driving Lesson Learner.
        </button>
      </Link>
    </div>
  );
};

export default Login;
