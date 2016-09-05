import React from 'react'
export default React.createClass({
  render: function () {
    return (
      <svg className="sp-gradient-marker" xmlns="http://www.w3.org/2000/svg"
           width="32" height="32" viewBox="0 0 32 32" fill="red"
           style={{marginLeft: -8, marginBottom: -16}}
           aria-labelledby="title">
        <title>marker</title>
        <defs>
          <filter id="pressed" x="0" y="0" width="150%" height="150%">
            <feOffset result="offOut" in="SourceAlpha" dx="1" dy="1"/>
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1"/>
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
          </filter>
          <filter id="unpressed" x="0" y="0" width="150%" height="150%">
            <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3"/>
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2"/>
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
          </filter>
          <path id="up-pressed" filter="url(#pressed)" d="M 8 0 L 16 16 L 0 16 z"></path>
          <path id="down-pressed" filter="url(#pressed)" d="M 0 0 L 16 0 L 8 16 z"></path>
          <path id="up-unpressed" filter="url(#unpressed)" d="M 8 0 L 16 16 L 0 16 z"></path>
          <path id="down-unpressed" filter="url(#unpressed)" d="M 0 0 L 16 0 L 8 16 z"></path>
        </defs>
        <use xlinkHref={(this.props.down ? '#down-' : '#up-') + (this.props.pressed ? 'pressed' : 'unpressed')}
             onClick={(evt)=> {
               this.props.onClick(evt, this)
             }} style={{cursor: 'pointer'}}></use>
      </svg>
    )
  }
})
