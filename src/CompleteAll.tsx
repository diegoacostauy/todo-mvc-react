import React from 'react'
import { useTodos } from './context/todo';

const CompleteAll = () => {
  const { toggleAllComplete } = useTodos();
  return (
    <>
      <input id="toggle-all" className="toggle-all" type="checkbox" onChange={(ev) => toggleAllComplete(ev.currentTarget.checked)} />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}

export default CompleteAll
