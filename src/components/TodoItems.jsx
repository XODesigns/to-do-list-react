import React from 'react'

export default function TodoItems(props) {
  return (
    <li>
    <input type="checkbox"  />
        {props.todos}
    </li>
  )
}
