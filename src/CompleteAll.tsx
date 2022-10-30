import React from 'react'
import { useTodos } from './context/todo';

const CompleteAll = () => {
  const { toggleAllCompleted } = useTodos();
  return (
    <>
      <input id="toggle-all" className="toggle-all" type="checkbox" onChange={(ev) => toggleAllCompleted(ev.currentTarget.checked)} />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}

export default CompleteAll
