import React from "react"
import Alert from "./alert/Alert"

export default class App extends React.Component {

  handleInvite = (ev)=> {
    ev.preventDefault()
  }

  render() {
    return (
      <div id="wrapper">
        <form onSubmit={this.handleInvite}>
          <p>So you found the right place. Invite your roomates.</p>
          <button className="btn blue">Invite</button>
        </form>
        <Alert />
      </div>
    )
  }
}