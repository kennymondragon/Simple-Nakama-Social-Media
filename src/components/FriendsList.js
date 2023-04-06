import { useEffect, useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { ImCheckmark, ImCross } from "react-icons/im";
import useAuth from "../hooks/useAuth";
import useNotifications from "../hooks/useNotifications";
import stupid from "../assets/images/stupid.png";
import { v4 } from "uuid";
function FriendsList() {
  const { user } = useAuth();
  const { notifDispatch } = useNotifications();
  const [friend, setFriend] = useState({ friendUsername: "" });
  const [friends, setFriends] = useState(undefined);
  const [friendrequests, setFriendrequests] = useState(undefined);
  const [friendUpdate, setFriendUpdate] = useState(undefined);

  useEffect(() => {
    console.log("listing friends...");
    user.nakamaClient?.listFriends(user.nakamaSession, 0).then((res) => {
      let Arr = [];
      for (let i = 0; i < res.friends.length; i++) {
        Arr.push(res.friends[i]);
      }
      if (Arr !== []) setFriends(Arr);
    });
  }, [friendUpdate, user]);

  useEffect(() => {
    console.log("listing incoming friend requests...");
    user.nakamaClient?.listFriends(user.nakamaSession, 2).then((res) => {
      let Arr = [];
      for (let i = 0; i < res.friends.length; i++) {
        Arr.push(res.friends[i]);
      }
      if (Arr !== []) setFriendrequests(Arr);
    });
  }, [friendUpdate, user]);

  const clickHandler = (e) => {
    e.preventDefault();
    addFriend(user, friend.friendUsername, notifDispatch, true);
  };

  return (
    <div className="outerWholeFriendsList">
      <div className="wholeFriendsList">
        <h3>Friends</h3>
        {friends ? (
          friends.map((request) => {
            return <FriendItem key={v4()} friend={request.user} />;
          })
        ) : (
          <p>Oh... This is awkward...</p>
        )}
        <>
          {friendrequests ? (
            <div>
              <h3>Friend Request</h3>
              {friendrequests.map((request) => {
                return (
                  <FriendRequestItem
                    key={v4()}
                    user={user}
                    notifDispatch={notifDispatch}
                    request={request.user}
                    setFriendUpdate={setFriendUpdate}
                  />
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </>
      </div>
      <input
        type="username"
        name="username"
        id="username"
        className="addFriendTextbox"
        onChange={(e) =>
          setFriend({ ...friend, friendUsername: e.target.value })
        }
        value={friend.friendUsername}
      />
      <button className="addFriendButton" onClick={clickHandler}>
        <HiUserAdd size={32} />
      </button>
    </div>
  );
}

async function addFriend(user, username, notifDispatch, outGoing) {
  console.log(user);
  await user.nakamaClient.addFriends(user.nakamaSession, [], [username]).then((res) => {
      notifDispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: v4(),
          code: "success",
          message: outGoing ? "Friend Request Successfully Sent" : "Friend Request Successfully Accepted",
        },
      });
    })
    .catch((err) => {
      notifDispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: v4(),
          code: "error",
          message: "User Does Not Exist",
        },
      });
    });
}

const FriendRequestItem = ({user, notifDispatch, request, setFriendUpdate}) => {
  
  const acceptFriendHandler = (e) => {
    e.preventDefault();
    addFriend(user, request.username, notifDispatch, false).then((res) => {
      if (res) setFriendUpdate(request.username);
    });
  };

  return (
    <div className="friendReqCard">
      <img
        src={request.avatar_url ? request.avatar_url : stupid}
        alt=""
        className="friendAvatarImage"
      />
      <p>{request.username}</p>
      <div className="friendReqOpt">
        <button className="acceptReqButton" onClick={acceptFriendHandler}>
          <ImCheckmark size={32} />
        </button>
        <button className="declineReqButton">
          <ImCross size={32} />
        </button>
      </div>
    </div>
  );
};

const FriendItem = ({ friend }) => {
  return (
    <div className="friendCard">
      <img
        src={friend.avatar_url ? friend.avatar_url : stupid}
        alt=""
        className="friendAvatarImage"
      />
      <p>{friend.username}</p>
    </div>
  );
};

export default FriendsList;
