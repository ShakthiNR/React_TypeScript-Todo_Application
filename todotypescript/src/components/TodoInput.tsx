import React, { useState } from 'react'
import TodoList from './TodoList';
export interface Itodo{
    id:number;
    task:string;
    deadline:string;
    isCompleted?:boolean
}

const TodoInput = () => {
    /* States used
    1. todo - single object to used for one task
    2. todos - array of object - contains all todos
    3. toggleupdate - used to toggle the add btn to updateBtn and cancelBtn
    */
    const [todo,setTodo] =useState<Itodo>({id:0,task:"",deadline:""}) 
    const [todos,setTodos] =useState<Itodo[]>([])
    const [toggleUpdate,setToggleUpdate] = useState<boolean>(false)

    //handleChange - used to update the todo object
   const handleChange =(e:React.ChangeEvent<HTMLInputElement>):void=>{
            setTodo({...todo,[e.target.name]:e.target.value})
            
   }
   /* handleSubmit
   1. If Update - store updated todo(obj-selected in TodoList comp) 
      in todos(arr of obj)
   2. If NotUpdate - add the todo to todos
   3. update todo to default value (to clear todo)
   */
   const handleSubmit=(e:React.FormEvent<HTMLFormElement>):void =>{
    e.preventDefault()
    if(toggleUpdate)
    {

        const newTodo:Itodo[] = todos.map((el)=>{
            if(el.id === todo.id)
            {
                return{
                    ...el,task:todo.task,deadline:todo.deadline
                }
            }
            return {...el}
        })
        setTodos(newTodo)
        //to turn off the update feature
        setToggleUpdate(false)
        //set the default todo object
        //to come out of handleSubmit function
    }
    else
    {
  //Add todo to todos
         setTodos([
            ...todos,
            {
                id:Date.now(),
                task:todo.task,
                deadline:todo.deadline,
                isCompleted:false
            }
        ])

    }  
    setTodo({id:0,task:"",deadline:""})
   }
   //To cancel the update features
   const handleCancel = ():void=>{
    setToggleUpdate(false)
    setTodo({id:0,task:"",deadline:""})
   }
/* Inside Component
1. Two Input 
2. Add Btn / Update + Cancel Btn
3. Calling TodoList Component - to list down all the todo from todos array
*/
  return (
    <>
    {/* Todo Form */}
    <div className='input'>
        <form className=' formDiv ' onSubmit={handleSubmit}>
            <input type="text" name="task" value={todo.task}
            onChange={handleChange}
            className='input-form' placeholder='Enter tasksName...' /> <br/>
            <input type="text" name="deadline" value={todo.deadline}
             onChange={handleChange}
            className='input-form' placeholder='Enter Deadline...'/> <br/>
            {
                toggleUpdate ? (<div className='flex justify-center mt-3'>
                <button type="submit" className='border border-purple-500 px-2 py-1'>Update Task</button>
                <button type='reset' onClick={handleCancel}  className='delBtn'>Cancel</button>
                </div>):
                (<>
                 <button type="submit" className='btn-submit'>Add Task</button>
                </>)
            }
           
        </form>
    </div>
    {/* Todo List */}
    <div>
        <TodoList 
        todos={todos} setTodos={setTodos} 
        setToggleUpdate={setToggleUpdate}
        todo={todo} setTodo={setTodo}
        />
    </div>
    </>
  )
}

export default TodoInput