import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const AuthLayout: React.FC<{ authentication: boolean }> = ({
  authentication,
  children,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(selectAuth);

  useEffect(() => {
    if (authentication && !token) {
      navigate("/signin");
    }
  }, [authentication, token, navigate]);

  return (
    <div>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
      {children}
    </div>
  );
};

export default AuthLayout;
