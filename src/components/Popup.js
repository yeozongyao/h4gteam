import React from 'react'

import './Popup.css'; 
import { useState } from 'react';

import PropTypes from 'prop-types';

function Popup(props) {

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>
                    close 
                </button>
                {props.children}
            </div>
        </div>
    ): "";
}
export default Popup