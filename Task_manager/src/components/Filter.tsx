import React, { useState } from 'react'

function Filter() {
    const [category, setCategory] = useState('To Do');
  return (
    <div>
         <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
        <option value="Timeout">Timeout</option>
      </select>
    </div>
  )
}

export default Filter