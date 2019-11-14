import React, { useContext, useEffect } from "react";
import Guest from "./Guest";
import GuestContext from "../../context/guestContext/guestContext";

const Guests = () => {
  const { guests, filterGuest, search, getGuests } = useContext(GuestContext);
  useEffect(() => {
    getGuests();
  }, [guests]);

  return (
    <div className="guests">
      {search !== null
        ? search.map(guest => <Guest key={guest._id} guest={guest} />)
        : guests
            .filter(guest => !filterGuest || guest.isconfirmed)
            .map(guest => <Guest guest={guest} key={guest._id} />)}
    </div>
  );
};
export default Guests;
