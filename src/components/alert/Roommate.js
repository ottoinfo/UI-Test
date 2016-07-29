import React from "react"
import { observer } from "mobx-react"

@observer
export default class Roommate extends React.Component {

  handleInputChange = (ev)=> {
    const { target } = ev
    this.roommate[target.name] = target.value
    console.log("input", this.roommate)
  }

  static propTypes = {
    roommate: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.roommate = props.roommate
  }

  checkValidation = (ev)=> {
    console.log(ev)
  }

  handleRemove = (ev)=> {
    ev.preventDefault()
    this.roommate.store.removeRoommate(this.roommate)
  }

  render() {
    const { roommate } = this
    return (
      <div className="roommate">
        <a className="remove" onClick={this.handleRemove}><span>X</span> Remove roommate <span>{ roommate.userNumber }</span></a>
        <div className={ roommate.errors.first_name ? "two-col error" : "two-col" }>
          <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" value={roommate.first_name} onChange={this.handleInputChange}/>
          <p className="error">{ roommate.errors.first_name }</p>
        </div>

        <div className={ roommate.errors.last_name ? "two-col error" : "two-col" }>
          <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" value={roommate.last_name} onChange={this.handleInputChange}/>
          <p className="error">{ roommate.errors.last_name }</p>
        </div>

        <div className={ roommate.errors.email ? "one-col error" : "one-col" }>
          <label htmlFor="email">Email Address</label>
          <input onBlur={this.checkValidation} type="text" name="email" value={roommate.email} onChange={this.handleInputChange}/>
          <p className="error">{ roommate.errors.email }</p>
        </div>
      </div>
    )
  }
}