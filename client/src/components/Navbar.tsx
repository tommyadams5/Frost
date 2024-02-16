// import axios from "axios";
import React from "react";
import "./Navbar.css";
import title from "../assets/Frost.png";

function Navbar() {
  const [showMessage, setShowMessage] = React.useState(false);
  const ToggleModal = () => {
    setShowMessage(!showMessage);
  };

  return (
    <div className="navbar">
      <div className="navbar_headers">
        <img className="navbar_logo" src={title} alt="" />
        <button className="navbar_link" onClick={ToggleModal}>
          Delete Account
        </button>
        <a className="navbar_link" href="/server/delete">
          Clear Feed
        </a>
        <a className="navbar_link" href="/server/logout">
          Logout
        </a>
      </div>
      {showMessage && (
        <div className="del_account_modal">
          <div>
            <div>Are you sure you want to delete this account?</div>
            <div className="del_account_options">
              <a
                className="del_account_buttons navbar_link"
                href="/server/delete-account"
              >
                Yes
              </a>
              <button
                className="del_account_buttons navbar_link"
                onClick={ToggleModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
