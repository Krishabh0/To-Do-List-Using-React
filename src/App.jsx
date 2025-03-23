import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
// Corrected import
import "./App.css";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [count, setCount] = useState(0);
//ha todo ek input text ahe
const [todo,setTodo] = useState("")
//ha ek array ahe jo purn todos la hold karte eka array form madhe
const [todos,setTodos] = useState([])
useEffect(()=>{
  let todoString = localStorage.getItem("todos")
  if(todoString){

    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
},[])



const saveToLS = ()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}



//edit
const handleEdit = (e,id) =>{

let t = todos.filter(i => i.id == id)
  setTodo(t[0].todo)
  let newTodos = todos.filter(item =>{
    return item.id !== id
  })
  setTodos(newTodos)
  saveToLS()
}

//delete

const handleDelete = (e,id)=>{
let index = todos.findIndex(item=>{
  return item.id === id;
})
let newTodos = todos.filter(item =>{
  return item.id !== id
})
setTodos(newTodos)
saveToLS()
}

const handleAdd = () =>{
setTodos([...todos,{id:uuidv4(), todo,isCompleted : false}])
setTodo("")
console.log(todos)
saveToLS()
}

const handleChange=(e)=>{
setTodo(e.target.value)
}

const handleCheackBox = (e) => {

  let id = e.target.name;
let index = todos.findIndex(item =>{
  return item.id === id
})
let newTodos = [...todos];
newTodos[index].isCompleted = !newTodos[index].isCompleted;
setTodos(newTodos)
saveToLS()
}


  return (
    <>
   
      <Navbar/>

   
<div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">

<div className="addTodo my-5">
  <h1 className="text-lg font-bold">Add a Todo</h1>
  <input onChange={handleChange} value={todo} className="input w-80" type="text"/>


  <button onClick={handleAdd} className="bg-violet-600 font-bold hover:bg-violet-900 p-3 py-1 text-sm text-white rounded-md m-6 cursor-pointer "  >Save</button>
</div>


    <h1 className="text-xl font-bold">Your Todos</h1>
 <div className="todos">
  {  todos.length===0 && <div className="m-5">No Todos to display</div>}
{todos.map(item => {

  
  return <div key={item.id} className="todo flex justify-between w-1/2 my-3">
    <input  onChange={handleCheackBox} type="checkbox" value={item.isCompleted} name={item.id}/>
    <div className={item.isCompleted ? "line-through":""}>{item.todo}</div>

<div className="flex h-full">

<div onClick={(e)=> handleEdit(e,item.id)} className="button">
  <button className= "  bg-violet-600 font-bold hover:bg-violet-900 p-3 py-1 text-sm text-white rounded-md mx-1 cursor-pointer "  >Edit</button>


</div>
  <button  onClick={(e)=>{ handleDelete(e,item.id)}} className="bg-violet-600 font-bold hover:bg-violet-900 p-3 py-1 text-sm text-white rounded-md mx-1 cursor-pointer " >Delete</button>
</div>
  </div>
})}

 </div>

</div>

      <Footer/>
     
    </>
  );
}

export default App;
