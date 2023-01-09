import {useState, useRef} from 'react'
import {v4 as uuidv4} from "uuid"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListItems from './ListItems';
import Footer from './Footer';
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
    const [active, setActive] = useState([])
    const [completed, setCompleted] = useState([])
    const [all, setAll] = useState([...items])


    
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
      setAll([...items, {id:uuidv4(), task:inputText, complete:false}]) 
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
  setItems(all)
  }
  
  function handleActive(){
   const ActiveTodos = [...items]
   const activeList = ActiveTodos.filter(todo => !todo.complete)
   const list = ActiveTodos.filter(todo => todo.complete)
   setActive(list)
   setItems(activeList)
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
  const completeList = completeTodos.filter(todo => todo.complete)
  const list = completeTodos.filter(todo => !todo.complete)
  setItems(completeList)
  setCompleted(list)
  }

  const deleteTodo = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleOnDragEnd = (result) =>{
    if (!result.destination) return;
    // console.log(result)
    // const newItems = Array.from(items)
    const newItems = [...items]
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
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

       <DragDropContext onDragEnd={handleOnDragEnd}>
       <Droppable droppableId="characters">

       {(provided) => (

        <ul {...provided.droppableProps} ref={provided.innerRef}>

       <ListItems 

       Draggable={Draggable}  
       handleComplete={handleComplete}
       handleChecked={handleChecked}
       checked={checked}
       items={items}
       setItems={setItems}
       theme={theme}
       deleteTodo={deleteTodo}
       /> 
       {provided.placeholder}
       </ul> 
       )}

       
        </Droppable>
        </DragDropContext>
        
          <div className="navigation">
        {listCount.length} items left

      <div className="filter">
        <button className={all.task ? 'all-items' :" active-items-link"} onClick={handleAll}>All</button>
        <button className='active-items' onClick={handleActive}>Active</button>
        <button className='completed-items' onClick={handleViewComplete}>Completed</button>
      </div>
      <button className="clear" onClick={handleClear}>Clear Completed</button>
    </div>
    <Footer /> 
      </div>
          
    </>
  )



}
