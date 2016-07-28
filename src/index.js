// import React from "react"
import svgDrag from "./svgDrag"

// Circle Example
const paper = Raphael(20, 20, 500, 250)
const path = paper.circle(125, 125, 100).attr({
  "stroke-width": 8,
})
const startPoint = path.getPointAtLength(0)
const circle = paper.ellipse(startPoint.x, startPoint.y, 10, 10).attr({ 
  stroke: "none", 
  fill: "#f00",
})
const text = paper.text().attr({
  x : 135,
  y : 125,
  "font-size": 36, 
  "font-family": "Arial, Helvetica, sans-serif",
  text: "0%",
})

new svgDrag(path, circle, (percent)=>{
  text.attr({ text: percent + "%" })
})

// Curve Line Example
const paper2 = Raphael(20, 250, 500, 350)
const path2 = paper2.path(["M", 50, 330, "Q", 225, 20, 400, 330]).attr({
  "stroke-width": 8,
})
const startPoint2 = path2.getPointAtLength(0)
const circle2 = paper2.ellipse(startPoint2.x, startPoint2.y, 10, 10).attr({ 
  stroke: "none", 
  fill: "#f00",
})
const text2 = paper2.text().attr({
  x : 205,
  y : 150,
  "font-size": 36, 
  "font-family": "Arial, Helvetica, sans-serif",
  text: "0%",
})

new svgDrag(path2, circle2, (percent)=>{
  text2.attr({ text: percent + "%" })
})