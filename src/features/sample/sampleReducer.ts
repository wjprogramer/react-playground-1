import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type SampleState = ReturnType<typeof store.getState>
export type SampleLoadState = { isLoading: boolean }

export type PayloadType = SampleError | CounterState | SampleLoadState | undefined;

export const isError = (payload: PayloadType): payload is SampleError => {
  return (<SampleError>payload).message !== undefined;
}

export const isLoading = (payload: PayloadType): payload is SampleLoadState => {
  return (<SampleLoadState>payload).isLoading !== undefined;
}

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
    rejectValue: SampleError,
    state: SampleState,
    dispatch: typeof store.dispatch,
  }
>(
  // type
  'sample/applyDelta',

  // payloadCreator(arg, thunkAPI)
  async (args, thunkAPI) => {
    try {
      await sleep(800);
      const flag = Math.random() < 0.5;
      if (flag) {
        throw Error();
      }

      return { value: thunkAPI.getState().sample.value + args.value };
    } catch (e) {
      return thunkAPI.rejectWithValue({
        code: '500',
        message: 'internal server error',
      });
    }
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
      console.log(action.type);
      console.log(action.payload);
      state.value = action.payload.value;
    })
    builder.addCase(applyDelta.pending, (state, action) => {
      console.log(action.type);
      console.log(action.payload);
    })
    builder.addCase(applyDelta.rejected, (state, action) => {
      console.log(action.type);
      console.log(action.payload);
    })
  },
})

export const store = configureStore({
  reducer: {
    sample: sampleSlice.reducer,
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = sampleSlice.actions
export { applyDelta }
export type SampleDispatch = typeof store.dispatch

export default sampleSlice.reducer