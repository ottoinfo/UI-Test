import { observable, computed } from "mobx"

export default class RoommateInvite {
  // Model Attributes
  @observable first_name = ""
  @observable last_name = ""
  @observable email = ""
  @observable errors = {}
  // Reference
  store = null

  constructor(data={}, store) {
    Object.assign(this, data)
    this.store = store
  }

  validateFirstName = () => {
    if (!this.first_name.length) {
      this.errors["first_name"] = "Please enter a first name"
    }
  }

  validateLastName = () => {
    if (!this.last_name.length) {
      this.errors["last_name"] = "Please enter a last name"
    }
  }

  validateEmail = ()=> {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(this.email)) {
      this.errors["email"] =  "Please enter a valid email address"
    }
  }

  validate = ()=> {
    this.errors = {}
    this.validateFirstName()
    this.validateLastName()
    this.validateEmail()
    return Object.keys(this.errors).length
  }

  asJSON = ()=> {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
    }
  }

  @computed get fullName() {
    return `${this.first_name} ${this.last_name}`
  }
}