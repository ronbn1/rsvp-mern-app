import React, {useContext} from 'react'
import GuestContext from '../../context/guestContext/guestContext'

const GuestCounter = () => {
  const {guests} = useContext(GuestContext);
  const totalInvited =  guests.length;
  const attending =  guests.filter(guest=>guest.isconfirmed);
  const totalAttending = guests.filter(guest=>guest.isconfirmed).length;
  const invitedByDiet = diet=>guests.filter(guest=>guest.dietary===diet).length;
  const atteindingByDiet = diet=>attending.filter(guest=>guest.dietary===diet).length;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Guest</th>
            <th>Invited</th>
            <th>Attending</th>
          </tr>
          <tr>
            <th>Non-Veg</th>
            <td>{invitedByDiet('Non-Veg')}</td>
            <td>{atteindingByDiet('Non-Veg')}</td>
          </tr>
          <tr>
            <th>Vegan</th>
            <td>{invitedByDiet('Vegan')}</td>
            <td>{atteindingByDiet('Vegan')}</td>
          </tr><tr>
            <th>Vegetarian</th>
            <td>{invitedByDiet('Vegetarian')}</td>
            <td>{atteindingByDiet('Vegetarian')}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{totalInvited}</td>
            <td>{totalAttending}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default GuestCounter
