import { Provider } from 'react-redux'
import { isError, isLoading } from './sampleReducer';
import { useSelector, useDispatch } from 'react-redux'
import { SampleDispatch, store, decrement, increment, applyDelta, SampleState, PayloadType } from './sampleReducer'
import { useState } from 'react';
import { isPending } from '@reduxjs/toolkit';

const buildContent = (payload: PayloadType) => {
    if (payload == undefined || isLoading(payload)) {
      return <>Loading</>
    }

    if (isError(payload)) {
      return <>
        Error {payload.code}: {payload.message}
      </>
    }

    return <>
      Value: {payload.value}
    </>
}

const Sample = () => {
  const count = useSelector((state: SampleState) => state.sample.value)
  const dispatch = useDispatch<SampleDispatch>()

  const [ actionPayload, setActionPayload ] = useState<PayloadType>();
  const [ actionType, setActionType ] = useState<string>('');

  const doDecrement = async () => {
    const res = await dispatch(applyDelta({ value: -1 }));

    setActionPayload(res.payload);
    setActionType(res.type);
  }

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
          onClick={() => doDecrement()}
        >
          Decrement
        </button>
        <div>
          { buildContent(actionPayload) }
        </div>
        <div>actionType: {actionType}</div>
        <div>actionPayload:{JSON.stringify(actionPayload)}</div>
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