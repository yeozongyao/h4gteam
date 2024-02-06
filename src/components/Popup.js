import React from 'react'

import './Popup.css'; 
import './Certdownload'; 
import { useState } from 'react';

import PropTypes from 'prop-types';

function Popup(props) {

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div className='button-container'>
                    {props.children}
                    <button onClick={() => props.setTrigger(false)}>
                        X
                    </button>
                    
                </div>
            </div>
        </div>
    ): "";
}
export default Popup