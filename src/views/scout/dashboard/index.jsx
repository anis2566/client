import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Success from "../apply/Success";

const ScoutDashboard = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((store) => store.auth);

  useEffect(() => {
    if (!userInfo?.isScout) {
      navigate("/scout/apply");
    }
  }, [userInfo?.isScout]);

  if (userInfo?.scoutStatus === "applied") {
    return <Success />;
  }

  return <div>ScoutDashboard</div>;
};

export default ScoutDashboard;
