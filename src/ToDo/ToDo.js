import React from "react";
import ToDoItem from "./ToDoItem";
import "./ToDo.css";

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedTodos: [],
      todos: [], // bisa dibuang
      newItem: "",
      dones: []
    };
    this.todoItems = [];
  }

  handleClickAdd() {
    const oldTodos = this.state.todos;
    const item = { todoItem: this.state.newItem };
    item.strike = false;
    oldTodos.push(item);
    this.setState({ ...this.state, todos: oldTodos });
    // frans:
    this.todoItems.push({todoItem: this.state.newItem, checked: false});
  }

  strikeItem(index) {
    //strike nya item dgn index jadi true)
    const tempTodos = this.state.todos;
    const item = tempTodos[index];
    item.strike = true;
    // this.setState({ ...this.state, todos: tempTodos });
    
    //frans:
    this.todoItems[index].checked = true; // ini kan ga setstate, jadi boleh
    this.setState({...this.state, displayedTodos: this.todoItems}); 
  }

  handleClickFilter() {
    //filter todos dgn strike=true jadi pindah ke dones
    const tempDones = this.state.todos.filter(item => item.strike);
    const tempTodos = this.state.todos.filter(item => !item.strike);
    this.setState({ ...this.state, dones: tempDones, todos: tempTodos });
  }

  handleClickOnlyTodos() {
    // this.setState({ ...this.state, filterAll: false });
    this.setState({displayedTodos: this.todoItems.filter(item => item.strike)});
  }
  handleClickShowAll() {
    // this.setState({ ...this.state, filterAll: true });
    this.setState({displayedTodos: this.todoItems});
  }
  inputNewItem(e) {
    const input = e.target.value;
    this.setState({ ...this.state, newItem: input });
  }

  render() {
    //if (this.state.filterAll) {
    return (
      <div>
        <input
          onChange={e => this.inputNewItem(e)}
          value={this.state.newItem}
        />
        <button onClick={() => this.handleClickAdd()}>Add</button>
        <p></p>
        <button onClick={() => this.handleClickOnlyTodos()}>Only Todos</button>
        <button onClick={() => this.handleClickShowAll()}>Show all</button>
        <button onClick={() => this.handleClickFilter()}>Filter</button>
        <h3>Aufgaben</h3>
        {this.state.todos.map((item, index) => (
          <ToDoItem
            text={item.todoItem}
            checked={item.strike}
            striked={() => this.strikeItem(index)}
          />
        ))}
        <h3>Erledigte Aufgaben</h3>
        {this.state.dones.map(item => (
          <p>{item.todoItem}</p>
        ))}

       <h3>Todos</h3>
       {this.state.displayedTodos.map((item, index) => (
          <ToDoItem
            text={item.todoItem}
            checked={item.strike}
            striked={() => this.strikeItem(index)}
          />
        ))}
      </div>
    );
  }
}
/*} else {
      return (
        <div>
          <input
            onChange={e => this.inputNewItem(e)}
            value={this.state.newItem}
          />
          <button onClick={() => this.handleClickAdd()}>Add</button>
          <p></p>
          <button onClick={() => this.handleClickOnlyTodos()}>
            Only Todos
          </button>
          <button onClick={() => this.handleClickShowAll()}>Show all</button>
          <button>Filter</button>
          <h3>Aufgaben</h3>
          {this.state.todos.map((item, index) => (
            <ToDoItem
              text={item.todo}
              onDelete={() => this.handleClickDone(index)}
            />
          ))}
          <h3>Erledigte Aufgaben</h3>
        </div>
      );
    }
  }*/
