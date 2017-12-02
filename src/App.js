import React, { Component } from 'react';

import ColumnList from './ColumnList';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentWillMount() {
    const toDoListItems = window.localStorage.getItem('toDoListItems') || '[]';
    this.setState({ items: JSON.parse(toDoListItems) });
  }

  addTask = (e) => {
    e.preventDefault();

    const { target = {} } = e;
    const input = target.querySelector('input') || {};
    const { value = '' } = input;

    this.setState(function(prev) {
      const { items = [] } = prev;
      const newTask = {
        id: items.length + 1,
        title: value,
        status: 'To-Do'
      };

      items.push(newTask);
      this.updateLocalStorage(items);
      return { items };
    })
  };

  updateLocalStorage = (items) => {
    window.localStorage.setItem('toDoListItems', JSON.stringify(items))
  };

  updateTask = (target, task) => {
    this.setState(function(prev) {
      const { items = [] } = prev;
      const s = items.filter(_ => _.id !== task.id);

      task.status = target.checked ? 'Done' : 'To-Do';
      s.push(task);
      this.updateLocalStorage(s);
      return { items: s };
    })
  };

  render() {
    const { items = [] } = this.state;
    const columns = [
      { title: 'To-Do', items },
      { title: 'Done', items }
    ];

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>To-Do List</h2>
        </div>
        <div className="App-container">
          <div className="app-lists">
            {columns.map(c => (
              <ColumnList
                key={c.title}
                title={c.title}
                items={c.items}
                addTask={this.addTask}
                updateTask={this.updateTask}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
