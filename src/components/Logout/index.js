import React from "react";
import Swal from "sweetalert2";
import { withAuthenticator } from "@aws-amplify/ui-react";

const Logout = ({ signOut }) => {
  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Logging Out",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        confirmLogout();
      }
    });
  };

  const confirmLogout = () => {
    // Perform the logout actions here
    localStorage.setItem("is_authenticated", false);
    signOut();
  };

  return (
    <button
      style={{ marginLeft: "12px" }}
      className="muted-button"
      onClick={handleLogout} // Call handleLogout, not signOut directly
    >
      Sign Out
    </button>
  );
};



export default withAuthenticator(Logout);