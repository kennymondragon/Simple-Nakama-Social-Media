import stupid from "../assets/images/stupid.png";
function UserCard({ username, avatar_url }) {
  return (
    <div className="userCardOuter">
      <div className="userCardInner">
        <h2 className="username">{username}</h2>
        <p>Current stats:</p>
        <div className="avatarImageOuterContainer">
          <div id="avatarImage" className="avatarImageContainer">
            <img
              src={avatar_url ? avatar_url : stupid}
              alt=""
              className="avatarImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
