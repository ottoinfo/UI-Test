import React from "react"
import Roomate from "./Roomate"

export default class Alert extends React.Component {

  handleClose = (ev)=> {
    ev.preventDefault()
    alert("close")
  }



  render() {
    return (
      <div id="alert">
        <form>
          <a className="close" onClick={this.handleClose}>X</a>
          <legend>
            <p className="title">Invite roomates</p>
            <p>We'll send your roommates an invite after you've<br />finished setting up your rent payment.</p>
          </legend>

          <fieldset>
            <Roomate />
          </fieldset>

          <div className="btns">
            <button className="btn">Nevermind</button>
            <button className="btn orange">Send Invites</button>
          </div>
        </form>
      </div>
    )
  }
}