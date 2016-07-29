import React from "react"
import Roommate from "./Roommate"
import RoommateStore from "../../stores/Roommate"
import { observer } from "mobx-react"
import { Motion, spring } from "react-motion" // noWobble gentle wobbly stiff

@observer
export default class Alert extends React.Component {

  static propTypes = {
    visible: React.PropTypes.boolean,
    onClose: React.PropTypes.function,
  }

  componentDidMount() {
    RoommateStore.visible = this.props.visible
    RoommateStore.addRoommate()
  }

  componentDidUpdate() {
    console.log("did update", this.props)
    RoommateStore.visible = this.props.visible
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
    this.props.onClose()
  }

  render() {
    const style = {
      default: {
        opacity: 0,
      },
      enter: {
        opacity: spring(1, { stiffness: 45, damping: 10 }),
      },
      leave: {
        opacity: spring(0),
      },
    }

    return (
      <Motion defaultStyle={ style.default } key="test" style={ (RoommateStore.visible ? style.enter : style.leave) }>
        { ({ opacity, y }) =>
          <div id="alert" style={ { opacity } }>
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
              <a className="add" onClick={this.handleAdd}><span>+</span> Add another roommate</a>
            }

              <div className="btns">
                 <button className="btn" onClick={this.handleClose}>Nevermind</button>
              { (RoommateStore.getRoommates().length != 0) &&
                 <button className="btn orange" onClick={this.handleSubmit}>Send Invites</button>
              }
              </div>
            </form>
          </div>
        }
      </Motion>
    )
  }
}