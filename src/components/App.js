import React from "react"
import { observer } from "mobx-react"
import UIStore from "../stores/UIStore"
import Alert from "./alert/Alert"

@observer
export default class App extends React.Component {

  handleInvite = (ev)=> {
    ev.preventDefault()
    UIStore.visible = true
  }

  handleClose = () => {
    UIStore.visible = false
  }

  render() {
    console.log("render", this.state)
    return (
      <div id="wrapper">
        <form onSubmit={this.handleInvite}>
          <p>So you found the right place. Invite your roomates.</p>
          <button className="btn blue">Invite</button>
        </form>
        <Alert visible={UIStore.visible} onClose={this.handleClose}/>
      </div>
    )
  }
}