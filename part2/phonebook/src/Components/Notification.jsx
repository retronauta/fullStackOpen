import React from "react";

const Notification = ({ message, fail }) => {
  const style = {
    color: "#1C2541",
    borderColor: "#0B132B",
    background: "#FFF8DC",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (fail) {
    style.background = "red";
    style.color = "yellow";
  }

  if (message === null) {
    return null;
  } else {
    return (
      <div>
        <p style={style}>{message}</p>
      </div>
    );
  }
};

export default Notification;
