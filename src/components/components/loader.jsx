import React, { useState} from 'react';
import cl from './Loader.module.css';



function Loader(props) {
    const [sh, setSh] = useState(0);
    const isShadow = props.isShadow;
    const isShowing = props.isShowing;
    document.documentElement.style.setProperty('--sh-y', (isShadow*(0.7)) + 'px');
   

    
    if (isShowing) {
        return (
            <div className={cl.loader_once}>

                <div className={cl.loader_animation_once}/>

                <div className={cl.loader_counter} percent={isShadow*(-1)} />

        </div>
        );
    }
    if (!isShowing) {
        return (
                <div className={cl.loader_infinite}>
                <div className={cl.loader_animation} >
                </div>
                </div>
                );
    }
    


};

export default Loader;

