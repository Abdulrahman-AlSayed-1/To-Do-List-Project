import { useRef, useState } from "react";
import './App.css';

function App() {
  const[tasks, setTasks] = useState([]);

  const inputRef=useRef(null);
  const appRef=useRef(null);

  const addTask=()=>{
    appRef.current.style.filter="blur(0)";
    inputRef.current.style.top="60%"
    inputRef.current.style.opacity="0"
    inputRef.current.style.visibility="hidden"

    if(!inputRef.current.firstElementChild.value) return;

    const newTask={completed:false, value:inputRef.current.firstElementChild.value};
    setTasks([...tasks,newTask]);
    inputRef.current.firstElementChild.value="";
  }
  const removeTask=(index)=>{
    const newTasksState=[...tasks];
    newTasksState.splice(index,1);
    setTasks(newTasksState);
  }
  const updateTask=(index)=>{
    const newTasksState=[...tasks];
    const listItems = document.querySelectorAll('li');
    
    newTasksState[index].completed=!newTasksState[index].completed;
    listItems[index].style.setProperty('--opacity', String(Number(newTasksState[index].completed)));
    listItems[index].style.setProperty('--scale',String(Number(newTasksState[index].completed)));
    setTasks(newTasksState)
  }
  const showTaskInput=()=>{
    appRef.current.style.filter="blur(5px)";
    inputRef.current.style.top="50%"
    inputRef.current.style.opacity="1"
    inputRef.current.style.visibility="visible"
    const time=setTimeout(()=>{
      inputRef.current.firstElementChild.focus();
    },500)
    return ()=>clearTimeout(time)
   }

  return(
  <>
   <div id="app" ref={appRef} className="col-10 col-md-7 col-lg-5 p-4 position-absolute top-50 start-50 translate-middle rounded-4">
    <h1 className="text-center display-6">To-Do List</h1>
    <ul className="col-10 mx-auto p-0">
      {
        tasks.map(({completed,value},index)=>{
          return(
            <div className="d-flex justify-content-between" key={index}>
              <li onClick={()=>{updateTask(index)}} style={{textDecoration: completed? 'line-through':'none'}}>
                <i className="fa fa-check"></i>
                <span>{value}</span> 
              </li>
              <i onClick={()=>removeTask(index)} className="fa-solid fa-trash"></i>  
            </div>
        )})

      }
    </ul>
    <button id="addBtn" onClick={showTaskInput} className="btn btn-dark rounded-circle ">
       <i className="fa-solid fa-plus"></i>
    </button>
   </div>
   <div id="inputDiv" ref={inputRef} className="col-10 col-md-7 col-lg-5">
      <input type="text" onKeyDown={(event)=>event.key==='Enter' && addTask()} className="w-100 rounded-3 bg-dark border-0" placeholder="Add a New Task..."/> 
      <button onClick={addTask} id="inputBtn" className="w-25 rounded-3 btn">Add</button>
   </div>  
  </>
 )
   
}

export default App;
