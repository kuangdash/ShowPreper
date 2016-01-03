'use strict'
import ReactDOM from 'react-dom'

exports.getFitSquareScaleFactor = function (desiredWidth, desiredHeight, width, height) {
  return (desiredWidth / desiredHeight < width / height) ? height / desiredHeight : width / desiredWidth
}

exports._scale = function (size) {
  let rootElSize
  try {
    rootElSize = window.getComputedStyle(ReactDOM.findDOMNode(this))
  }
  catch (ex) {
    return
  }
  let domWidth = parseInt(rootElSize.width) - parseInt(rootElSize.paddingLeft) - parseInt(rootElSize.paddingRight)
  let domHeight = parseInt(rootElSize.height) - parseInt(rootElSize.paddingTop) - parseInt(rootElSize.paddingBottom)

  let componentWidth, componentHeight, componentTop, componentRight, componentBottom, componentLeft
  if (size.width || size.height) {
    componentWidth = size.width
    componentHeight = size.height
    componentTop = 0
    componentRight = size.width
    componentBottom = size.height
    componentLeft = 0
  }
  else {
    componentWidth = size.right - size.left
    componentHeight = size.bottom - size.top
    componentTop = size.top
    componentRight = size.right
    componentBottom = size.bottom
    componentLeft = size.left
  }

  let scale = exports.getFitSquareScaleFactor(
    componentWidth,
    componentHeight,
    domWidth,
    domHeight
  )
  let leftOffset = (domWidth - componentWidth * scale) / 2
  let topOffset = (domHeight - componentHeight * scale) / 2
  let scaleStr = " scale(" + scale + ")"
  let componentCx = (componentLeft + componentRight) / 2
  let componentCy = (componentTop + componentBottom) / 2
  let domCx = componentWidth * scale / 2
  let domCy = componentHeight * scale / 2
  let translateX = domCx - componentCx
  let translateY = domCy - componentCy
  let translateStr = ' translate(' + translateX + 'px,' + translateY + 'px)'
  let scaleStyle = {
    transform: translateStr + scaleStr,
    marginLeft: leftOffset + 'px',
    width: componentCx * 2,
    height: componentCy * 2,
  }
  this.setState({
    scaleStyle: scaleStyle,
    scale: scale
  })
}
