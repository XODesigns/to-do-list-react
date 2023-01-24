import {useState} from 'react'
import {TfiClose} from 'react-icons/tfi'

function ListItems({
    Draggable,
    handleComplete, 
    handleChecked,
    checked,
    items,
    setItems,
    theme,
    deleteTodo,
    category,
    setCategory,
    all,
    setAll,
}) {

    const [display, setDisplay] = useState(0)

    const clicked = () => {
      handleChecked()

      // if(items.complete){
      //   setCategory("Active")
      // } else {
      //   setCategory("Completed")
      // }
    
    }

  return (
        <>

        {items.map((todo, index) => (

          <Draggable 
          key={todo.id} 
          draggableId ={todo.id}
          index={index}
          >
          
          {(provided, snapshot) => (

            <li  onMouseEnter={()=>{
                if(todo.id){
                setDisplay(todo.id)
                } 
              }}
              onMouseLeave={()=>{
                if(todo.id){
                    setDisplay(0)
                    }
              }}

              {...provided.draggableProps}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              // className={todo.complete || todo.complete ? "hide" : null}
              >

          <div className={!theme ? 'list-items dark-theme' : 'list-items light-theme'} 
          key={todo.id} 
          complete={todo.complete} 
          >

          <div className='items'
          >
          <input 
          type="checkbox" 
          onChange={()=> 
            handleComplete(todo.id)
          } 
          onClick={clicked}
          value={todo.task} checked={todo.complete || todo.complete ? !checked : null} />
          <span className={` ${todo.complete || todo.complete ? "checked-item" : "not-checked-item"} ${!theme ? "dark-theme" : "light-theme" }`}>{todo.task}</span>
          </div>
          <span onClick={()=> deleteTodo(todo.id)}>
          {display === todo.id && <p className='clear-me'><TfiClose /></p>}
          </span>
          </div> 
          </li>

          )}
          </Draggable>
        ))}
       
        </>
  )
}

export default ListItems