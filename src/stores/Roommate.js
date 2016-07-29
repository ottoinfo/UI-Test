import { observable } from "mobx"
import Roommate from "../models/RoommateInvite"

class RoommateStore {
  @observable visible = false
  @observable roommates = []
  @observable errors = {}

  setup(args) {
    Object.assign(this, args)
  }

  createModel = (roommate={})=> {
    return new Roommate(roommate, this)
  }

  addRoommate(roommate) {
    this.roommates.push(this.createModel(roommate))
  }

  updateRoommate(json) {
    const roommate = this.findRoommate(json.uuid)
    if (!roommate) {
      this.addRoommate(json)
    }
    else {
      roommate.updateRoommate(json)
    }
  }

  removeRoommate(roommate) {
    console.log("remove", roommate.uuid, this.roommates.findIndex((obj)=> obj.uuid == roommate.uuid))
    this.roommates.splice(this.roommates.findIndex((obj)=> obj.uuid == roommate.uuid), 1)
  }

  getRoommates = ()=> {
    console.log("get")
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