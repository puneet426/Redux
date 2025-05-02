
# 🔁 Redux Toolkit + React – Complete Guide with Code and Theory

This README is **source to revise Redux Toolkit** using React JS. It explains everything — from setup to usage — with theoretical concepts, flowchart, and code in one place.

---

## 📈 Redux Architecture – Visual Flow

![Redux Flowchart](./public/Screenshot%202025-05-01%20220721.png)

### 🧠 Flow Explanation:

- `App.jsx` (or any component):
  - Reads **global state** using `useSelector()` (read-only).
  - Updates state using `dispatch()` with actions.

- **Actions**: Events that describe "what happened" (e.g., `increment`).

- **Reducers**: Pure functions that handle how state should change.

- **Store**: Centralized container for the application’s state.

This creates a **unidirectional data flow** — predictable and easier to debug.

---

## 🧰 Step 1: Installation

Install Redux Toolkit and React Redux:

```bash
npm install @reduxjs/toolkit react-redux
```

---

## 🏗️ Step 2: Create Redux Store

📁 Create a folder named `store/` and inside it, add `store.jsx`.

```js
// store/store.jsx
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reducers/CounterSlice'

// Create store and register reducers
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

🧠 `configureStore()` sets up the Redux store and includes good defaults like DevTools.

---

## ⚛️ Step 3: Provide Store to App

Wrap the entire application with the `<Provider>` so Redux state is accessible everywhere.

```js
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

---

## ✂️ Step 4: Create a Redux Slice

📁 Create a `reducers/` folder, then create `CounterSlice.js`.

```js
// reducers/CounterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

// createSlice auto-generates action creators and types
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Export actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Export reducer
export default counterSlice.reducer
```

🧠 `createSlice()` automatically:
- Generates action creators.
- Handles state immutability with `Immer`.

---

## 🧑‍💻 Step 5: Use Redux in Components

Access state and dispatch actions using hooks:

```js
// App.jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
} from './reducers/CounterSlice'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      <button onClick={() => dispatch(incrementAsync(10))}>
        +10 after 1 sec
      </button>
    </div>
  )
}

export default App
```

🧠
- `useSelector` reads state (read-only).
- `useDispatch` sends actions to reducers to update state.

---

## 🕐 Step 6: Async Actions (Thunk)

Add asynchronous logic with a function inside a function:

```js
// Add to reducers/CounterSlice.js
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}
```

🧠 This is a manual thunk (function that returns a function).
Useful for:
- Delays
- API calls
- Any async logic

---

## 🗂️ Recommended Folder Structure

```
src/
├── App.jsx
├── main.jsx
├── store/
│   └── store.jsx
├── reducers/
│   └── CounterSlice.js
```

---

## 📌 Summary

| Concept           | Explanation                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `configureStore` | Sets up Redux store with middleware and dev tools                           |
| `createSlice`    | Creates reducer, actions, and state logic in one place                      |
| `useSelector`    | Reads state from Redux                                                      |
| `useDispatch`    | Sends actions to Redux to update state                                      |
| `Provider`       | Makes Redux store available to all components                               |
| Thunks           | Used for async logic like API calls or delayed updates                      |

---

## ✅ Benefits of Redux Toolkit

- 🚫 No more manual action types/constants
- ✅ Built-in support for immutability
- ⚡ Simple async logic using thunks
- 👀 Better Redux DevTools support
- 🔁 Easy to scale and manage large apps

---

## 📌 Notes for Revision

- One global store = single source of truth.
- Actions describe "what happened", reducers define "how state changes".
- Use `createSlice` instead of manually writing action creators + reducers.
- For async tasks (APIs), use **thunks**.

---

Feel free to fork this and use it as a boilerplate for your Redux projects 🚀

# 🧠 In-Depth Theory: Redux and Redux Toolkit

## What is Redux?

**Redux** is a predictable state container for JavaScript applications, often used with React.

It helps manage **global state** in a centralized store, making it easier to debug and reason about your application's behavior.

### Why Use Redux?
- **Global State Management**: No need to pass props through multiple components.
- **Predictability**: State changes are centralized and follow strict rules.
- **Debugging**: Redux DevTools help you trace when, why, and how your application's state changed.
- **Maintainability**: Clear separation of concerns makes your code more maintainable.

---

## 🔁 Core Concepts in Redux

### 1. **Store**
The **store** holds the whole state tree of your application. It's the single source of truth.

### 2. **Actions**
Actions are plain JavaScript objects that describe **what happened**. Every action must have a `type` property.

Example:
```js
{ type: 'INCREMENT' }
```

### 3. **Reducers**
Reducers are pure functions that take the previous state and an action, and return the next state.

Example:
```js
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    default:
      return state;
  }
}
```

### 4. **Dispatch**
Used to send actions to the store. It is how you **update** the state.

### 5. **Selectors**
Functions that extract specific pieces of state from the store.

---

## 🧰 Redux Toolkit (RTK)

Redux Toolkit simplifies Redux usage by abstracting complex boilerplate code.

### Benefits of Redux Toolkit:
- ✅ No need to manually write action types or action creators.
- ✅ Built-in support for immutable updates via Immer.
- ✅ Includes `createAsyncThunk` for handling async actions.
- ✅ Automatically sets up Redux DevTools and middleware.

---

## 🧩 Key APIs from Redux Toolkit

### 1. **`configureStore()`**
Simplifies the store setup and adds useful defaults.

```js
const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

### 2. **`createSlice()`**
Combines `reducers` and `actions` in a single place.

```js
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 }
  }
});
```

### 3. **`createAsyncThunk()`**
Helps manage asynchronous logic like fetching data from APIs.

```js
export const fetchData = createAsyncThunk('data/fetch', async () => {
  const response = await fetch('/api/data');
  return response.json();
});
```

---

## 🔀 How Redux Toolkit Works Under the Hood

| Layer        | What It Does | Tools |
|--------------|--------------|-------|
| Component    | Reads and dispatches state | `useSelector`, `useDispatch` |
| Action       | Description of change | Automatically created by `createSlice()` |
| Reducer      | Handles state change | Defined inside `createSlice()` |
| Store        | Holds the app's state | Created with `configureStore()` |
| Middleware   | Extends Redux behavior | `redux-thunk` (for async) included by default |

---

## 🧪 Best Practices

- Keep your state normalized (avoid deeply nested objects).
- Slice state logically (e.g., users, posts, products).
- Use `createSlice` to auto-generate actions and reducers.
- Use `immer` (enabled by default in Redux Toolkit) to write "mutating" logic safely.
- Always export both the actions and the reducer.

---

## 🛠 When *Not* to Use Redux?

Redux is powerful, but you might not need it if:
- Your state is simple and local to a few components.
- You can manage it easily using `useState` and `useContext`.

In those cases, Redux might add unnecessary complexity.

---

## 📦 Redux Middleware (Advanced Concept)

Middleware in Redux provides a third-party extension point between dispatching an action and the moment it reaches the reducer. This is often used for:

- Logging actions
- Performing asynchronous calls
- Dispatching conditional actions
- Error reporting

### 🔄 What is Middleware?

A middleware is a function that intercepts actions before they reach the reducer. It can:
- Modify the action
- Cancel the action
- Dispatch new actions
- Allow the original action to continue

---

### 📚 Using Middleware in Redux

To use middleware in traditional Redux, you use `applyMiddleware` during store creation:

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // example middleware

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
```

---

### 🔍 How `applyMiddleware` Works

Here’s a simplified version of how Redux internally composes middleware:

```js
function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    let dispatch = store.dispatch;
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    const chain = middlewares.map(mw => mw(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);
    return { ...store, dispatch };
  };
}
```

---

### ✍ Writing Your Own Middleware

```js
const myLogger = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action); // forward the action
  console.log('Next state:', store.getState());
  return result;
};
```

You can also short-hand it with arrow functions:

```js
const myLogger = store => next => action => {
  // custom logic here
  return next(action);
};
```

---

### 🔄 Responding to Specific Actions

```js
const specialMiddleware = store => next => action => {
  if (action.type !== 'SPECIAL') return next(action);
  // custom logic for SPECIAL actions
};
```

---

### ⛔ Stopping the Chain

Sometimes middleware handles an action completely and doesn't need to pass it on:

```js
const stopActionMiddleware = store => next => action => {
  if (action.type === 'STOP_HERE') {
    // Do something, but don’t forward
    return;
  }
  return next(action);
};
```

---

### 🚀 Example: Middleware Dispatching New Action

```js
const newActionMiddleware = store => next => action => {
  if (action.type === 'ORIGINAL') {
    store.dispatch({ type: 'NEW_ACTION' });
  }
  return next(action);
};
```

If middleware only had access to `next`, not `store.dispatch`, this would not be possible without affecting action order. This is why the full `store.dispatch` is given to middleware.

---

### 🛠️ Middleware in Redux Toolkit

In Redux Toolkit, middleware like `redux-thunk` is already included:

```js
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  // additional middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myLogger)
});
```

Redux Toolkit simplifies middleware integration by including good defaults and offering flexibility.

---

### ✅ Summary

| Feature | Traditional Redux | Redux Toolkit |
|--------|-------------------|----------------|
| Middleware Setup | `applyMiddleware()` | `configureStore().middleware` |
| Included Middleware | Manual | Thunk included by default |
| Custom Middleware | Yes | Yes |
| Async Actions | Via Thunk | Built-in |

Middleware provides a robust way to enhance Redux’s functionality, especially in complex apps involving async logic or logging.



