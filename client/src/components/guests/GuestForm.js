import React, { useState, useContext, useEffect } from "react";
import GuestContext from "../../context/guestContext/guestContext";

const GuestForm = () => {
  const { addGuest, edit, clearEdit, updateGuest } = useContext(GuestContext);
  useEffect(() => {
    if (edit !== null) {
      setGuest(edit);
    } else {
      setGuest({
        name: "",
        phone: "",
        dietary: "Non-Veg"
      });
    }
  }, [edit]);
  const [guest, setGuest] = useState({
    name: "",
    phone: "",
    dietary: "Non-Veg"
  });

  const hendleChange = e => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value
    });
  };

  const onsubmit = e => {
    e.preventDefault();
    if (edit !== null) {
      updateGuest(guest);
      console.log(guest);
      clearEdit();
    } else {
      guest.id = Date.now();
      addGuest(guest);
      setGuest({
        name: "",
        phone: "",
        dietary: "Non-Veg"
      });
    }
  };
  return (
    <div className="invite-section">
      <h1>{edit === null ? "Please Invite Someone" : "Edit Guest"}</h1>
      <form onSubmit={onsubmit}>
        <input
          className="nameInput"
          type="text"
          placeholder="Name"
          name="name"
          value={guest.name}
          onChange={hendleChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={guest.phone}
          onChange={hendleChange}
        />
        <p className="options-label">Dietary</p>
        <div className="options">
          <label className="container">
            Non-veg
            <input
              type="radio"
              name="dietary"
              value="Non-Veg"
              checked={guest.dietary === "Non-Veg"}
              onChange={hendleChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Vegan
            <input
              type="radio"
              name="dietary"
              value="Vegan"
              checked={guest.dietary === "Vegan"}
              onChange={hendleChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Vegetarian
            <input
              type="radio"
              name="dietary"
              value="Vegetarian"
              checked={guest.dietary === "Vegetarian"}
              onChange={hendleChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <input
          type="submit"
          value={edit === null ? "Add Guest" : "Update Guest"}
          className="btn"
        />
        {edit !== null ? (
          <input
            value="Cancel"
            type="button"
            className="btn clear"
            onClick={clearEdit}
          ></input>
        ) : null}
      </form>
    </div>
  );
};

export default GuestForm;
