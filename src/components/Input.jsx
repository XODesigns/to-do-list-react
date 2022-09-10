import {useState, forwardRef, useEffect, useRef} from 'react'
import {v4 as uuidv4} from "uuid"
import Navigation from "./Navigation";



export default function Input() {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);
    const [checked, setChecked] = useState([])


    function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }


  function handleKeyDown(e) {

    if (e.key === "Enter" && inputText.trim().length !== 0) {

      setItems((prev) => {
        return [...prev, {id:uuidv4(), item:inputText}]
      });
      setInputText("")     
    }
  }

  

  const handleCheck = (event) => {  
    let newValue = [...items]
    if(event.target.checked){
      newValue = [...checked, event.target.value]
    }else {
      newValue.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(newValue)
  }

  const isChecked = (item) => checked.includes(item) ? "checked-item" : "not-Checked"
  let isRemoved = checked.length ?  items.length - checked.length : items.length



  const clearCompleted = () => {

  }

   return (
    <>
     <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Create a new todo.." 
        value={inputText}
      />

       <div className="list-items-list">
        {items.map((todo) => (
          <div className='list-items' key={todo.id} >
          <input type="checkbox"  onChange={handleCheck} value={todo.item} />
          <span className={isChecked(todo.item)}>{todo.item}</span>
          </div> 
        ))}
        
         <Navigation itemsLeft={isRemoved} 
         clear={clearCompleted} 

         />
      </div>
            
    </>
  )



}
