"use client";

import React from 'react';
import HOMESEPERATOR from '../../assets/HOME_Seperator_1.png';


function Seperator() {
    return (
        <div className="flex justify-center my-2">
                        <img src={HOMESEPERATOR} alt="Separator" className="h-12" />
                      </div>
    );
}

export default Seperator;