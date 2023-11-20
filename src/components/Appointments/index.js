// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {date: '', title: '', appointmentList: [], filter: false}

  starredAppointments = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitButton = event => {
    event.preventDefault()
    const {date, title} = this.state
    const appointments = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, appointments],
      title: '',
      date: '',
    }))
  }

  filteredAppointments = () => {
    this.setState(prevState => ({filter: !prevState.filter}))
  }

  render() {
    const {date, title, appointmentList, filter} = this.state
    console.log(date, title, appointmentList)
    let filteredList = appointmentList
    if (filter === true) {
      filteredList = appointmentList.filter(
        eachItem => eachItem.isStarred === true,
      )
    } else {
      filteredList = appointmentList
    }

    return (
      <div className="app-container">
        <div className="container">
          <div className="top-container">
            <div className="input-container">
              <h1>Add Appointment</h1>
              <form onSubmit={this.onSubmitButton}>
                <label htmlFor="inputText">TITLE</label>
                <input
                  value={title}
                  name="inputText"
                  className="input-text"
                  type="text"
                  id="inputText"
                  onChange={this.changeTitle}
                />
                <label htmlFor="inputDate">DATE</label>
                <input
                  value={date}
                  name="inputDate"
                  className="input-date"
                  type="date"
                  id="inputDate"
                  onChange={this.changeDate}
                />
                <button data-testid="star" className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="bottom-container">
            <div className="starrer-container">
              <h1>Appointments</h1>
              <button
                onClick={this.filteredAppointments}
                className="buttons"
                type="button"
              >
                Starred
              </button>
            </div>
            <ul>
              {filteredList.map(eachItem => (
                <AppointmentItem
                  starredAppointments={this.starredAppointments}
                  listOfItems={eachItem}
                  key={eachItem.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
