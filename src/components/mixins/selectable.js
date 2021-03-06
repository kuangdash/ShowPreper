'use strict'
import ReactDOM from 'react-dom'
import lang from 'i18n/lang'

exports.componentDidMount = function () {
  this.mouseDownHdlrs.unshift(this.onSelectionMouseDown)
}
exports.componentWillUnmount = function () {
  document.removeEventListener('mousemove', this.onScaleMouseMove)
}
exports.onSelectionMouseDown = function (ev, i) {
  ev.stopPropagation && ev.stopPropagation()
  let selectedWidgets = this.props.selectedWidgets
  if (!ev.shiftKey) {
    // allowing DnD multiple components
    if (selectedWidgets.length > 1 && typeof(i) === 'number' && selectedWidgets.indexOf(i) >= 0) {
      return false
    }
    selectedWidgets.splice(0, selectedWidgets.length)
  }
  if (typeof(i) === 'number') {
    selectedWidgets.unshift(i)
  }
  this.props.component.components.forEach((e, i, a) => {
    if ((e.selected && selectedWidgets.indexOf(i) < 0) ||
      (selectedWidgets.indexOf(i) >= 0 && e.selected !== true)) {
      this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated({
          container: this.props.component,
          index: i
        }, {
          selected: selectedWidgets.indexOf(i) >= 0
        }
      )
    }
  })
}
