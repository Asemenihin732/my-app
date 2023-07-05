import React from 'react';
import "./MyButton.Module.css"
import { Button, Space } from 'antd';
const MyButton = ({ children, ...props }) => {
    return (
        

        <Button {...props} className="myBtt" >{children}</Button>

            
    );
};

export default MyButton;