import React, { useState, useEffect} from 'react';
import MyButton from "./components/MyButton";
import Calc from "./components/calc";
import "./App.css";
import cl from './components/div_urb.css'
import Loader from './components/loader';
import cla from './components/Loader.module.css'



function App() {
    const [variables, setVariables] = useState([1,10,20,30,40,50,60,70,80,90,100]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(currentIndex => (currentIndex + 1) % variables.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [variables.length]);

  return (
      <div className="App" align="center">
          <div align="center" position="relative">
              <Loader isShowing={true} isShadow={-variables[currentIndex]} />
            </div>
      </div>
  );
}

export default App;

