import { Input, Space } from 'antd';
import React, { useState } from 'react';
import MyButton from "./MyButton";

const Calc = () => {
    const [frt,setFrt]=useState(0);///Сохранить первое число
    const [sec, setSec]=useState(0);///Сохранить второе число
    const [str, setStr] = useState("");///Для сохранения знака действия
    const [input, setInput] = useState("");
    const [result, setResult] = useState(0);
    var res;
    function handleInput(event) {
        setInput(event.target.input);
    }
    function handleButtonClick(newValue) {
        setInput(input + newValue);
    }
   /* function handleButtonPlus() {
        
        setResult(parseInt(frt)+parseInt(input));
        setInput(result);
    }
    function handleButtonMultiply() {
        setResult(parseInt(frt) * parseInt(sec));
        setInput(result);
    }
    function handleButtonDivide(frt, sec) {
        setResult(frt / sec);
        setInput(result);
    }
    function handleButtonMinus(frt, sec) {
        setResult(frt - sec);
        setInput(result);
    }
    function handleSetRes() {
        setInput(result);
    }*/

    function handleButtonResult() {
        switch(str) {
            case "+": {
                setResult(parseInt(frt) + parseInt(input));
                setInput(result);
                res = result;
                setStr("");
                return (setInput(result));
            }
            case "*":
                setResult(parseInt(frt) * parseInt(input));
                setInput(result);
                setStr("");
                return (setInput(result));
               ;
            case "/":
                setResult(parseInt(frt) / parseInt(input));
                setInput(result);
                setStr("");
                return (setInput(result));
            case "-":
                setResult(parseInt(frt) - parseInt(input));
                setInput(result);
                setStr("");
                return (setInput(result));
            default:
                return (setInput("Enter value"));
        }
        setInput(result);
    }

     function handleFirstNum() {
        setFrt(input);
        setInput("");
    }

    function plus() {
        handleFirstNum();
        setStr("+");
    }

    function minus() {
        handleFirstNum();
        setStr("-");
    }

    function multiply() {
        handleFirstNum();
        setStr("*");
    }

    function divide() {
        handleFirstNum();
        setStr("/");
    }
    function clearInput() {
        setInput("");
    }
   
    return (
        <form align="center">
            <div>
                <Input type="text" value={input} onChange={handleInput} placeholder="Calculator" />
                Result: {result}
        </div>

            <div> <br />
                <MyButton onClick={divide}>/</MyButton>
                <MyButton onClick={multiply}>*</MyButton>
                <MyButton onClick={clearInput}>C</MyButton>
             </div>
            <div>
                <br />
                <MyButton onClick={() => handleButtonClick('1')}>1</MyButton>
                <MyButton onClick={() => handleButtonClick('2')}>2</MyButton>
                <MyButton onClick={() => handleButtonClick('3')}>3</MyButton>
        </div>
        <div><br />
                <MyButton onClick={() => handleButtonClick('4')}>4</MyButton>
                <MyButton onClick={() => handleButtonClick('5')}>5</MyButton>
                <MyButton onClick={() => handleButtonClick('6')}>6</MyButton>
        </div>
        <div><br />
                <MyButton onClick={() => handleButtonClick('7')}>7</MyButton>
                <MyButton onClick={() => handleButtonClick('8')}>8</MyButton>
                <MyButton onClick={() => handleButtonClick('9')}>9</MyButton>
        </div>
            <div><br />
                <MyButton onClick={plus}>+</MyButton>
                <MyButton onClick={() => handleButtonClick('0')}>0</MyButton>
                <MyButton onClick={minus} >-</MyButton>
        </div>
        <div><br />
                
                <MyButton onClick={handleButtonResult}>=</MyButton>
                
        </div>
        
    </form>);
}

export default Calc;