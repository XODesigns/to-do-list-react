import {useState, forwardRef, useEffect, useRef} from 'react'
import {v4 as uuidv4} from "uuid"
import Navigation from "./Navigation";



export default function Input() {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);
    const [completedTaskCount, setCompletedTaskCount] = useState(0)
    // const [checked, setChecked] = useState([])


    function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }


  function handleKeyDown(e) {

    if (e.key === "Enter" && inputText.trim().length !== 0) {

      setItems((prev) => {
        return [...prev, {id:uuidv4(), task:inputText, complete:false}]
      });
      setInputText("")     
    }
  }

  const handleComplete = (id) => {
    let list = items.map((task) => {
      let item = {}
      if (task.id === id) {
        if (!task.complete){
          setCompletedTaskCount(completedTaskCount + 1)
        } else {
          setCompletedTaskCount(completedTaskCount - 1)
        }

        item = {...task, complete: !task.complete }
      } else item = {...task}

      return item
    })
    setItems(list)
  }

let listCount = items.length - completedTaskCount

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
          <div className={'list-items'} key={todo.id} 
          complete={todo.complete} 
          >

          <input type="checkbox" onChange={()=> handleComplete(todo.id)} />
          <span className={ todo.complete ? "checked-item" : "not-checked-item"}>{todo.task}</span>

          </div> 
        ))}
        
         <Navigation itemsLeft={listCount} 
 

         />
      </div>
            
    </>
  )



}
