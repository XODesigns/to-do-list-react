import {useState, useRef} from 'react'
import {v4 as uuidv4} from "uuid"
// import Navigation from "./Navigation";



export default function Input({setTheme, theme}) {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([
      {id:uuidv4(),task: "Complete online JavaScript course", complete:true},
      {id:uuidv4(),task: "Jog around the park 3x", complete:false},
      {id:uuidv4(),task: "10 minutes meditation", complete:false},
      {id:uuidv4(),task: "Read for 1 hour", complete:false},
      {id:uuidv4(),task: "Pick up groceries", complete:false},
      {id:uuidv4(),task: "Complete Todo App on Frontend Mentor", complete:false}
    ]);
    const [completedTaskCount, setCompletedTaskCount] = useState(0)
    const [checked, setChecked] = useState(false)


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

  function handleClear(){
   const newTodos = items.filter(todo => !todo.complete)
   setItems(newTodos)
   setCompletedTaskCount(0)
  }

  function handleAll(){
    const ActiveTodos = [...items]
  // const AllTodos = items.filter(todo => todo)
  setItems(ActiveTodos)
  }
  
  function handleActive(){
  const ActiveTodos = [...items]
   const list = ActiveTodos.filter(todo => !todo.complete)
   setItems(list)
   console.log(list.length)
  }

  const handleChecked = (evt) =>{
    if(evt.target.value){
      setCompletedTaskCount(completedTaskCount - 1)
    } else {
      setCompletedTaskCount(completedTaskCount + 1)
    }
    
  }

  const handleViewComplete = () =>{
    const completeTodos = [...items]
   const list = completeTodos.filter(todo => todo.complete)
   setItems(list)
   console.log(list.length)
  }




 

let listCount = items.filter(todo => !todo.complete)


   return (
    <>

      <div className={!theme ? 'text-input dark-theme' : 'text-input light-theme'}>
    <span className={!theme ? 'input-circle dark-theme' : 'input-circle light-theme'}></span>
     <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Create a new todo.." 
        value={inputText}
      />
      </div>

       <div className={!theme ? "list-items-list dark-theme" : "list-items-list light-theme" }>
        {items.map((todo) => (
          <div className={!theme ? 'list-items dark-theme' : 'list-items light-theme'} 
          key={todo.id} 
          complete={todo.complete} 
          draggable
          >

          <input type="checkbox" onChange={()=> handleComplete(todo.id)} onClick={handleChecked} value={todo.task} checked={todo.complete || todo.complete ? !checked : null} />
          <span className={` ${todo.complete || todo.complete ? "checked-item" : "not-checked-item"} ${!theme ? "dark-theme" : "light-theme" }`}>{todo.task}</span>

          </div> 
        ))}
        
        
          <div className="navigation">
        {listCount.length} items left

      <div className="filter">
        <button onClick={handleAll}>All</button>
        <button onClick={handleActive}>Active</button>
        <button onClick={handleViewComplete}>Completed</button>
      </div>
      <button className="clear" onClick={handleClear}>Clear Completed</button>
    </div>
      </div>
            
    </>
  )



}
