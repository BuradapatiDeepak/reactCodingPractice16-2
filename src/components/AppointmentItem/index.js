import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {listOfItems, starredAppointments} = props
  const {id, title, date, isStarred} = listOfItems
  const newDate = new Date(date)
  const dateInWords = format(newDate, 'dd MMMM yyyy, EEEE')
  const starFunction = () => {
    starredAppointments(id)
  }
  const srcImage = !isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  return (
    <li>
      <div className="appointment-title-container">
        <p>{title}</p>
        <button className="star-button" type="button" onClick={starFunction}>
          <img src={srcImage} alt="star" className="star-image" />
        </button>
      </div>
      <p>{dateInWords}</p>
    </li>
  )
}

export default AppointmentItem
