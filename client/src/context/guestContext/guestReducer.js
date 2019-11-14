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

export default (state, { type, payload }) => {
  const { filterGuest } = state;
  const reg = new RegExp(payload, "gi");

  switch (type) {
    case GET_GUESTS:
      return {
        ...state,
        guests: payload
      };
    case EDIT_GUEST:
      return {
        ...state,
        edit: payload
      };
    case CLEAR_EDIT:
      return {
        ...state,
        edit: null
      };
    case UPDATE_GUEST:
      return {
        ...state,
        guests: state.guests.map(guest =>
          guest._id === payload._id ? payload : guest
        )
      };

    case REMOVE_GUEST:
      return {
        ...state,
        guests: state.guests.filter(guest => guest._id !== payload)
      };

    case ADD_GUEST:
      return {
        ...state,
        guests: [...state.guests, payload]
      };

    case TOGGLE_FILTER:
      return {
        ...state,
        filterGuest: !filterGuest
      };

    case SEARCH_GUEST:
      return {
        ...state,
        search: state.guests.filter(guest => guest.name.match(reg))
      };
    case GUESTS_ERROR:
      return {
        ...state,
        guests: [],
        errors: payload
      };
    case CLEAR_GUEST:
      return {
        ...state,
        search: null
      };
    default:
      return { ...state };
  }
};
