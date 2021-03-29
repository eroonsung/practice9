import React, { createContext, useReducer, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true,
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true,
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: true,
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false,
  },
];

//Create, Toggle, Remove
function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    /*todo.id와 action.id를 비교해서 일치하지 않는 것만 가져옴 -> 일치하는 것은 사라짐*/
    case 'REMOVE':
      return state.filter((todo) => action.id !== todo.id);
    default:
      throw new Error('Unhandled action type : ${action.type}');
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIDContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIDContext.Provider value={nextId}>
          {children}
        </TodoNextIDContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

//custom Hook 만들기
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIDContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

// context가 없을 때 Error 처리
