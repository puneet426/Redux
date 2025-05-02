import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementAsync,} from './reducers/CounterSlice'

function App() {
  const {value} = useSelector((state)=> state.counter)
  const dispatch = useDispatch()
  return (
    <div className='m-auto container p-10 mt-5 bg-red-100'>
      <h1 className=' mb-5 text-center text-3xl font-bold text-red-900'>Counter:{value}</h1>

    <div className='text-center '>
      <button onClick={()=>dispatch(increment())} className='text-red-900 border-red-900 border-2 rounded bg-transparent px-5 py-2'>Increment</button>
      <button onClick={()=>dispatch(decrement())} className='mx-5 text-red-900 border-red-900 border-2 rounded bg-transparent px-5 py-2'>Decrement</button>
      <button onClick={()=>dispatch(incrementAsync(5))} className='mx-5 text-red-900 border-red-900 border-2 rounded bg-transparent px-5 py-2'>Increment by 5</button>
    </div>

    </div>
  )
}

export default App
