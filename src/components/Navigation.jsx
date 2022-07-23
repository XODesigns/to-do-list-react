import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <div className='navigation'>
     5 items left
     <div className="filter">
                <button>All</button>
          <button >Active</button>
          <button>Completed</button>
     </div>
  
          <button className='clear'>Clear Completed</button>
    </div>
  )
}
