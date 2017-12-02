import React from 'react';
import If from './If';

import './ColumnList.css';

const ColumnList = ({ title, items = [], addTask, updateTask }) => {
  const currentItems = items.filter(_ => _.status === title);

  return (
    <div className="column-list">
      <h3>{title}</h3>
      <If test={title === 'To-Do'}>
        <form onSubmit={addTask}>
          <input type="text" placeholder="Criar nova tarefa"/>
          <button type="submit">
            Criar
          </button>
        </form>
      </If>
      <ul className="list-items">
        {currentItems.map(item => (
          <li
            key={item.id}
          >
            <input
              type="checkbox"
              checked={title === 'Done'}
              onChange={(e) => updateTask(e.target, item)}
            />
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default ColumnList;