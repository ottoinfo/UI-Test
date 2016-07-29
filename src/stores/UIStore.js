import { observable } from "mobx"

class UIStore {
  @observable visible = false
}

const singleton = new UIStore()
export default singleton