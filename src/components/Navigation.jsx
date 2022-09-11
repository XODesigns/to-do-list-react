import { Link } from "react-router-dom";



export default function Navigation({itemsLeft, handleClear, todo}) {

  function handleRemove(){
      handleClear(todo.id)
  }
    
  return (
    <div className="navigation">
        {itemsLeft} items left

      <div className="filter">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
      <button className="clear" onClick={handleRemove}>Clear Completed</button>
    </div>
  );
}
