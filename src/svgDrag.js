"use strict"

export default class svgDrag {

  constructor(path, dragItem, cb) {
    if (!path || !dragItem)
      throw new Error("You need to pass in a `PATH` and `DRAG ITEM`")
    // Setup
    this.path = path
    this.dragItem = dragItem
    this.position = 0
    this.totalLength = 0
    this.searchDistanceLength = 1
    this.totalLength =  this.path.getTotalLength()
    this.callback = cb

    // Events
    this.path.click(this.click)
    this.dragItem.drag(this.move, this.start, this.up)
  }

  click = (ev)=> {
    console.log("Jump to Place", ev.x, ev.y)
  }
  
  start = ()=> {
    this.originalX = this.dragItem.attr("cx")
    this.originalY = this.dragItem.attr("cy")
    this.dragItem.attr({ opacity: 1 })
  }

  move = (distanceX, distanceY)=> {
    const tempPoint = {
      x: this.originalX + distanceX, 
      y: this.originalY + distanceY,
    }
    this.position = this.gradualSearch(this.position, tempPoint)
    const point = this.path.getPointAtLength(this.position)
    this.dragItem.attr({ cx: point.x, cy: point.y })
  }

  up = ()=> {
    this.dragItem.attr({ opacity: 1 })
  }

  gradualSearch = (position, tempPoint)=> {
    position = position + this.totalLength
    let currentPostion = position
    let distanceStart = this.distance(this.path.getPointAtLength(position % this.totalLength), tempPoint)
    let distanceEnd = null
    let direction = null

    if (this.distance(this.path.getPointAtLength((position - this.searchDistanceLength) % this.totalLength), tempPoint) > 
      this.distance(this.path.getPointAtLength((position + this.searchDistanceLength) % this.totalLength), tempPoint)) {
      direction = this.searchDistanceLength
    } 
    else {
      direction = -this.searchDistanceLength
    }

    currentPostion += direction
    distanceEnd = this.distance(this.path.getPointAtLength(currentPostion % this.totalLength), tempPoint)
    while (distanceEnd < distanceStart) {
      distanceStart = distanceEnd
      currentPostion += direction
      distanceEnd = this.distance(this.path.getPointAtLength(currentPostion % this.totalLength), tempPoint)
    }
    currentPostion -= direction
    this.callback(parseInt(currentPostion / this.totalLength * 100) - 100)
    return (currentPostion % this.totalLength)
  }

  distance = (tempPoint1, tempPoint2)=> {
    const distanceX = tempPoint1.x - tempPoint2.x
    const distanceY = tempPoint1.y - tempPoint2.y
    return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
  }
}