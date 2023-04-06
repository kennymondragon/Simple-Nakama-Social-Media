import { Link } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { BsGear, BsChat } from "react-icons/bs";
import useAuth from "../hooks/useAuth";

function NavBar() {
  const { user } = useAuth();
  // TODO: fix spacing for NavBar as they are too small...
  return (
    <div className="wholeNav">
      <div className="innerNav">
        <h2>Social Media</h2>
        <div id="icons">
          {user.nakamaSession?.username ? (
            <>
                <Link to="settings">
                    <BsGear size={32} />
                </Link>
            </>
          ) : (
            <></>
          )}
          <Link to="dashboard">
            <IoIosLogIn size={32} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
