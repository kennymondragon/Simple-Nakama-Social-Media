import stupid from "../assets/images/stupid.png";

function AvatarCircle({ avatar_url }) {
  return (
    <div className="avatarImageOuterContainer">
        <div id="avatarImage" className="avatarImageContainer">
            <img src={avatar_url ? avatar_url : stupid} alt="" className="avatarImage"/>
        </div>
    </div>
  );
}

export default AvatarCircle;
