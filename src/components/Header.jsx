import { useState, useRef, useEffect} from "react";
import Sun from "../images/icon-sun.svg";


import Input from "./Input"

export default function Header() {


  return (
    <div className="todoContainer">
      <h1>Todo</h1>
      <img src={Sun} />
      <Input />
          
    </div>
  );
}
