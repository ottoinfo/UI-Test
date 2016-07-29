import React from "react"
import Alert from "./alert/Alert"

export default class App extends React.Component {

  state = {
    visible: true,
  }

  handleInvite = (ev)=> {
    ev.preventDefault()
    this.setState({ visible: true })
  }

  handleClose = () => {
    this.setState({ visible: false }) 
  }

  render() {
    console.log("render", this.state)
    return (
      <div id="wrapper">
        <form onSubmit={this.handleInvite}>
          <p>So you found the right place. Invite your roomates.</p>
          <button className="btn blue">Invite</button>
        </form>
        <Alert visible={this.state.visible} onClose={this.handleClose}/>
      </div>
    )
  }
}