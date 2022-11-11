import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface SampleError {
  code: string,
  message: string,
}

export interface CounterState {
  value: number,
}

const initialState: CounterState = {
  value: 0,
}

const applyDelta = createAsyncThunk<
  CounterState,
  { value: number },
  {
    rejectValue: SampleError
  }
>(
  // type
  'sample/applyDelta',

  // payloadCreator(arg, thunkAPI)
  async (delta, thunkAPI) => {
    await sleep(500);
    console.log(delta, '/', thunkAPI.getState());
    return { value: 1 };
  }
)

export const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(applyDelta.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value = action.payload.value;
    })
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = sampleSlice.actions
export { applyDelta }

export default sampleSlice.reducer