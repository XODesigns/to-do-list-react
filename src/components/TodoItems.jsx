import {useState, useRef} from 'react'

export default function TodoItems(props) {

  const [isChecked, setChecked] = useState(false)
   const checkedRef = useRef()

    function handleChecked(){
    setChecked(!isChecked)
  }

  let className = ""
    if(isChecked){
      className = 'completed'

      console.log(isChecked)
    }


  return (
    <li className={className}>
    <input type="checkbox" ref={checkedRef} onChange={handleChecked}  value={props.checked} />
        {props.todos}
    </li>
  )
}


