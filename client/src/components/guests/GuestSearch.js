import React , { useContext, useRef } from 'react'
import GuestContext from '../../context/guestContext/guestContext'

const GuestSearch = () => {
  const {searchGuest,clearSearch} = useContext(GuestContext);
  const searchValue = useRef()
  const handleChange = e=>{
    if(searchValue.current.value !==null){
      searchGuest(e.target.value)
    }
    else{
      clearSearch()
    }
  }

  return (
    <div>
      <input ref={searchValue} onChange={handleChange} type="text" className="search" placeholder=" Search Guest by name ..." />
      <i className="fas fa-search search-icon" />
    </div>
  )
}

export default GuestSearch
