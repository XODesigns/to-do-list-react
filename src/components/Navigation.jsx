import { Link } from "react-router-dom";



export default function Navigation(props) {
    
  return (
    <div className="navigation">
        {props.itemsLeft} items left

      <div className="filter">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
      <button className="clear">Clear Completed</button>
    </div>
  );
}
