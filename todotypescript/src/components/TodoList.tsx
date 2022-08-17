import React, { FC, useEffect } from 'react'
import { Itodo } from './TodoInput'
//Interface for props
interface Iprops{
    todos:Itodo[] //key todos should match with props key
    setTodos: React.Dispatch<React.SetStateAction<Itodo[]>>
    setToggleUpdate:React.Dispatch<React.SetStateAction<boolean>>
    todo: Itodo;
    setTodo: React.Dispatch<React.SetStateAction<Itodo>>

}
let newTodo:Itodo[] // To store the updated todo in todos array of object

/*
1. const TodoList= (props:Iprops) => {}             ------>  then use props.todo to access
2. const TodoList= ({todos,setTodos}:Iprops) => {}   --> Directly destructuring the props    
3.const TodoList:FC <Iprops> = ({todos,setTodos,setToggleUpdate,setTodo}) => {}
                 |
                 |-> used to import from React then use <Iprops> after component name
                    Note : We can use props or destructure the props

*/

const TodoList:FC <Iprops> = ({todos,setTodos,setToggleUpdate,setTodo}) => {

  //handleDelete = get deleteTodo id filter it in todos and update it
    const handleDelete = (i:number):void=>{
      newTodo = todos.filter((el)=>{
        return el.id !== i
      })
      setTodos(newTodo)
    }
 /* handleUpdate-
      1. Set the toggleUpdate (to change to the updateBtn)
      2. Set the todo (single todo which value is stored on input box)
      3. Then in TodoInput.tsx map through todos and update the value if todo.id is matched
      */
    
    const handleUpdate = (i:number)=>{
     
        setToggleUpdate(true)
        todos.map((item:Itodo):void=>{
          if(item.id===i){
            setTodo({id:i,task:item.task,deadline:item.deadline})
          }
        })
        
      }

 //handleToggle - to update the completed Status from todo in todos
    const handleToggle =(i:number)=>{
      //Two way to update 
       /* 1.  const newTodo = todos.map((item) => {
            if (item.id === i) {
              return {
                ...item,isCompleted:true
              };
            }
            return {...item};
          })
        setTodos(newTodo) */

       //2.
        setTodos(prevState =>{
            newTodo =  prevState.map(obj=>{
                if(obj.id===i) //Match 
                {
                    return { ...obj,isCompleted:!obj.isCompleted} //Toggle the isCompleted Value
                }
                return obj //If not matched return all
            })
            return newTodo //Return after matching to setState
        })
    
    }
/*  Inside Component
1. Map through todos and list the todo
2. Have Delete,Update,ToggleStatus Features 
*/
  return (
   <>
  
   <div className="todoCenter">
    <div className="formDiv">


            <div className="todoCenter">
            {
                todos?.map((todo:Itodo,i:number)=>{
                    return(
                        
                        <div key={i}>
                            <span className={todo.isCompleted?"text-red-500 cursor-pointer line-through":"text-gray-500  cursor-pointer"}
                            onClick={()=>handleToggle(todo.id)}>   
                            {i+1}  {todo.task} - {todo.deadline}  - {todo.isCompleted ?"Yes Completed":"Not Completed"}
                            </span>
                         
                            <button className='upBtn' onClick={()=>handleUpdate(todo.id)}>Update</button>
                            <button className='delBtn' onClick={()=>handleDelete(todo.id)}>Delete</button>
                       
                        </div>
                        
                    )
                })
            }

            </div>
    </div>
    </div>
   </>
  )
}

export default TodoList