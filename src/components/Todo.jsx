import React from 'react'

const Todo = ({toDo}) => {
  return (
    <div className='flex justify-center items-center flex-col gap-3   w-72 mt-5 p-3 bg-slate-400 rounded-lg shadow-xl'>
      <h1>Title{toDo.title}</h1>
      <span>{toDo.completed?(
        <span className='bg-green-500 rounded-lg text-white px-3 py-1'>Done</span>
      ):(
        <span className='bg-red-500 rounded-lg text-white px-3 py-1'>Not completed</span>
      )}</span>
    </div>
  )
}

export default Todo
