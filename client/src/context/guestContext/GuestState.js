import React, { useReducer } from "react";
import axios from "axios";
import GuestContext from "./guestContext";
import guestReducer from "./guestReducer";
import {
  TOGGLE_FILTER,
  CLEAR_GUEST,
  SEARCH_GUEST,
  ADD_GUEST,
  REMOVE_GUEST,
  UPDATE_GUEST,
  EDIT_GUEST,
  CLEAR_EDIT,
  GET_GUESTS,
  GUESTS_ERROR
} from "../type";

const GuestState = props => {
  const initialState = {
    filterGuest: false,
    search: null,
    edit: null,
    guests: [],
    errors: null
  };
  const [state, dispatch] = useReducer(guestReducer, initialState);

  const getGuests = async () => {
    try {
      const res = await axios.get("/guests");
      dispatch({
        type: GET_GUESTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err
      });
    }
  };

  const addGuest = async guest => {
    const config = {
      "Content-Type": "application/json"
    };
    try {
      const res = await axios.post("/guests", guest, config);
      dispatch({
        type: ADD_GUEST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err
      });
    }
  };

  const editGuest = guest => {
    dispatch({
      type: EDIT_GUEST,
      payload: guest
    });
  };

  const updateGuest = async guest => {
    const config = {
      "Content-Type": "application/json"
    };

    try {
      const res = await axios.put(`/guests/${guest._id}`, guest, config);
      dispatch({
        type: UPDATE_GUEST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err
      });
    }
  };

  const removeGuest = async id => {
    try {
      await axios.delete(`/guests/${id}`);
      dispatch({
        type: REMOVE_GUEST,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err
      });
    }
  };

  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    });
  };

  const toggleFilter = () => {
    dispatch({
      type: TOGGLE_FILTER
    });
  };
  const searchGuest = guest => {
    dispatch({
      type: SEARCH_GUEST,
      payload: guest
    });
  };
  const clearSearch = () => {
    dispatch({
      type: CLEAR_GUEST
    });
  };
  return (
    <div>
      <GuestContext.Provider
        value={{
          guests: state.guests,
          toggleFilter,
          filterGuest: state.filterGuest,
          search: state.search,
          searchGuest,
          clearSearch,
          addGuest,
          removeGuest,
          updateGuest,
          edit: state.edit,
          editGuest,
          clearEdit,
          getGuests
        }}
      >
        {props.children}
      </GuestContext.Provider>
    </div>
  );
};

export default GuestState;
