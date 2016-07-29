import { observable } from "mobx"
import Roommate from "../models/RoommateInvite"

class RoommateStore {
  @observable visible = false
  @observable roommates = []
  @observable errors = {}

  setup(args) {
    Object.assign(this, args)
  }

  createModel = (user={})=> {
    return new Roommate(user, this)
  }

  addRoommate(user) {
    this.roommates.push(this.createModel(user))
  }

  updateRoommate(json) {
    const user = this.findRoommate(json.id)
    if (!user) {
      this.addRoommate(json)
    }
    else {
      user.updateRoommate(json)
    }
  }

  removeRoommate(user) {
    this.roommates.splice(this.roommates.findIndex((obj)=> obj.id == user.id), 1)
  }

  getRoommates = ()=> {
    return this.roommates.slice()
  }

  validateModels = ()=> {
    let pass = true
    this.roommates.map(roommate =>{
      if (!roommate.validate()) {
        pass = false
      } 
    })
    return pass
  }

  asJSON = ()=> {
    const json = []
    this.roommates.map(roommate => {
      json.push(roommate.asJSON())
    })
    return json
  }

  handleErrors = (resp)=> {
    const data = {}
    resp.errors.map((item)=>
      data[item.field] = item.message
    )
    this.errors = data
  }
}

const singleton = new RoommateStore()
export default singleton