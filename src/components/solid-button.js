import React from 'react'

import PropTypes from 'prop-types'

import './solid-button.css'

const SolidButton = (props) => {
  return (
    <div className="solid-button-container">
      <button className="solid-button-button button Button">
        {props.button}
      </button>
    </div>
  )
}

SolidButton.defaultProps = {
  button: 'Button',
}

SolidButton.propTypes = {
  button: PropTypes.string,
}
<<<<<<< HEAD
=======

>>>>>>> 89f5da5f9ec5dd0271f81491887a00c59f74626c
export default SolidButton
