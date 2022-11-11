import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import sampleReducer from './sampleReducer';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, applyDelta } from './sampleReducer'

const store = configureStore({
  reducer: {
    sample: sampleReducer,
  },
})

type RootState = ReturnType<typeof store.getState>

const Sample = () => {
  const count = useSelector((state: RootState) => state.sample.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          // onClick={() => dispatch(decrement())}
          onClick={() => dispatch(applyDelta({ value: -1 }))}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

const SampleContainer = () => {
  return <Provider store={store}>
    <Sample />
  </Provider>
}

export default SampleContainer;