import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'
import './index.css'

const Home = () => {

    const [addTodo , setTodo] = useState('')
    const[todoItem, setTodoItemList] = useState([])
    const [editStateId, setEditState] = useState(null)

    const editclicked = (id) => {
        const oldItem = todoItem.filter(eachItem=> (eachItem.id=== id))
        setTodo(oldItem[0].name)
        setEditState(id)

        
    }

    const delClicked = (id) => {
       const removed = todoItem.filter((eachItem)=> eachItem.id !== id )
       setTodoItemList(removed)


    }

    const addToList = () => {
        if (addTodo!==''){

            if(editStateId === null){
                const name = addTodo
                const toBeUpdated = parseInt(name[name.length-1])
                const finalList =[]

                if (isNaN(toBeUpdated) || toBeUpdated===0 || toBeUpdated===1){
                    const uniqueId = uuidv4()
                     finalList.push({id: uniqueId, name: addTodo, updated: 0})
                }
                else{

                    for (let i=0; i<toBeUpdated; i++){
                        const uniqueId = uuidv4()
                        finalList.push({id: uniqueId, name: addTodo, updated: 0})
         
                    }

                }            
                             
                setTodoItemList(prevState=>[...prevState,...finalList])
                setTodo('')                
            }
            else{

            const oldItem = todoItem.filter(eachItem=> (eachItem.id=== editStateId) )

            setTodo(oldItem[0].name)
            oldItem[0].name =  addTodo
            oldItem[0].updated = oldItem[0].updated+1
            setTodo('')   
            setEditState(null) 

            }

            

        }
        

    }
   

    const onAddTodoItem = (event) => { 
               setTodo(event.target.value)        
        

    }

    return (
    

    <div className="bg-cont">

        <h1 className='main-head'> Day Goals!</h1>
        <input className='text-box' type='text' onChange={onAddTodoItem} placeholder='Add your task here..' value={addTodo} /> 
        <br></br>
        { editStateId ? <button className='button' onClick={addToList}> Update Todo  </button>: <button className='button' onClick={addToList}> Add Todo  </button> }
        
        {todoItem.map((eachItem)=> <TodoItem key={eachItem.uniqueId} items={eachItem} editclicked={editclicked} delClicked={delClicked} /> )}
    
    </div>)
}

export default Home