import React from "react"
import Roommate from "./Roommate"
import RoommateStore from "../../stores/Roommate"
import { observer } from "mobx-react"

@observer
export default class Alert extends React.Component {

  componentDidMount() {
    console.log("here")
    RoommateStore.addRoommate()
  }

  componentWillUpdate() {
    console.log("will update")
  }

  handleAdd = (ev)=> {
    ev.preventDefault()
    RoommateStore.addRoommate()
  }

  handleSubmit = (ev)=>{
    ev.preventDefault()
    if (RoommateStore.validateModels()) {
      console.log(RoommateStore.asJSON())
    }
  }

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
            { RoommateStore.getRoommates().map((roommate, i) =>
              <Roommate key={i} roommate={roommate}/>
            ) }
          </fieldset>

        { (RoommateStore.getRoommates().length < 5) &&
          <a className="add" onClick={this.handleAdd}>+ Add another roommate</a>
        }

          <div className="btns">
            <button className="btn" onClick={this.handleClose}>Nevermind</button>
            <button className="btn orange" onClick={this.handleSubmit}>Send Invites</button>
          </div>
        </form>
      </div>
    )
  }
}