import { useState, useRef, useEffect} from "react";
import Sun from "../images/icon-sun.svg";
import Moon from "../images/icon-moon.svg"


import Input from "./Input"

export default function Header({theme, setTheme}) {


  const handleTheme = () =>{
    setTheme(!theme)
  }

  return (
    <div className="todo-container dark-theme">
      <h1>Todo</h1>
      <img alt="theme-toggle" src={!theme ? Sun : Moon} onClick={handleTheme} className="theme-toggle" />
      <Input setTheme={setTheme} theme={theme} />
          
    </div>
  );
}
