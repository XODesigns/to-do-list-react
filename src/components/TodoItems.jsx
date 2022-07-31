import {useState, useRef, useEffect} from 'react'
import Checkbox from './Checkbox'


export default function TodoItems(props) {
  const refCheck = useRef()


      useEffect(()=>{
        
      const checkbox = refCheck.current.checked

     console.log(checkbox)
  })

  const completedClass = 'completed'

  return (
    <li className='list-item'>
          <Checkbox ref={refCheck} />
        {props.todos}
    </li>
  )
}


