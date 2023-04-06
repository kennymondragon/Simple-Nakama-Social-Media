import React from "react";
import useAuth from "../hooks/useAuth";
import UserCard from "../components/UserCard";
import DashTitle from "../components/DashTitle";
import FriendsList from "../components/FriendsList";
import Feed from "../components/Feed";

function Dashboard() {
  const { auth, user } = useAuth();
  console.log("Dashboard");
  console.log(user);
  return (
    <div className="wholeDash">
      <div className="leftDash">
        <DashTitle username={auth.username} />
        <UserCard
          username={auth.username}
          avatar_url={user.nakamaAccount?.user.avatar_url}
        />
        <Feed />
      </div>
      <FriendsList />
    </div>
  );
}

export default Dashboard;
