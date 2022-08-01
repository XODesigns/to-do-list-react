import {useState, useRef, useEffect, forwardRef} from 'react'


const TodoItems = forwardRef((props, refCheck) => {

    const [isChecked, setChecked] = useState(false)


      function handleChecked(e){
    setChecked(!isChecked)
  }

let completedClass = ''

  if(isChecked){
    completedClass = "completed"
  }


  return (
    <li className={completedClass}>
    <input type="checkbox" ref={refCheck} onChange={handleChecked}  />
        {props.todos}
    </li>

  )
})


export default  TodoItems
