import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// https://www.npmjs.com/package/uuid

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  },[])  

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
    saveToLS()
  }
  
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item=>{
      return item.id !==id;
    });
    setTodos(newTodos);
    saveToLS()
  }

  const handleDelete = (e, id) => {
    confirm("Are you sure, data will be deleted permanently")
    // console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    // console.log(index)
    let newTodos = todos.filter(item=>{
      return item.id !==id;
    });
    setTodos(newTodos);
    // console.log(newTodos, todos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    // console.log(todos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    // console.log(e, e.target)
    let id = e.target.name;
    // console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    // console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !(newTodos[index].isCompleted);
    setTodos(newTodos);
    // console.log(newTodos, todos)
    saveToLS()
  }
  

  return (
    <>
      <Navbar />
      <div className="md:container bg-violet-100 mx-3 md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
      <h1 className='font-extrabold text-center text-4xl my-[30px]'>iPlanner - MANAGE YOUR TASKS AT ONE PLACE</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className="addTodo text-3xl font-bold">ADD A TODO</h2>
            <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' spellCheck="false" />
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-purple-500 hover:bg-purple-950 p-5 text-sm font-bold text-white rounded-full mx-5 disabled:bg-purple-900'>Save</button>
            </div>
          </div>
          <input className='my-8 accent-purple-800' id="show" onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
          <label className='mx-2 font-semibold' htmlFor="show">SHOW FINISHED </label>
          <div className="h-[1px] bg-purple-800 opacity-30 mx-auto w-[90%] my-8"></div>
          <h2 className='text-3xl font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-5 font-semibold'>EMPTY STACK!</div>}
            {todos.map(item=>{
              

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between font-semibold items-center">
              <div className='flex gap-5'>
              <input className='accent-purple-800' onChange={handleCheckbox} type="checkbox" name={item.id} checked={item.isCompleted}/>
              <div className={item.isCompleted ? "line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-purple-800 hover:bg-violet-950 px-4 py-2 text-sm font-bold text-white rounded-md mx-2 h-12 w-12'><FaEdit /></button>
                <button onClick={(e)=>handleDelete(e, item.id)} className='bg-purple-800 hover:bg-violet-950 px-4 py-2 text-sm font-bold text-white rounded-md mx-2 h-12 w-12'><AiFillDelete /></button>
              </div>
            </div>
            })}
          </div>
        </div>
    </>
  )
}

export default App
