import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./../node_modules/bulma/css/bulma.css";

function Todo(props) {
  const handleClick = event => {
    props.markAsDone(props.todo);
  };

  return (
    <div className="columns">
      <div className="column">
        <div
          style={{ cursor: "pointer" }}
          onClick={handleClick}
          className="content is-large"
        >
          {props.todo.todo}
        </div>
      </div>
      <div className="column is-narrow">
        <input
          className="is-large"
          type="checkbox"
          checked={props.todo.done}
          readOnly
          onChange={handleClick}
        />
      </div>
    </div>
  );
}

function AddTodo(props) {
  const [todoText, setTodoText] = useState("");

  const addTodo = event => {
    if (event.keyCode === 13) {
      props.addTodo(todoText);
      setTodoText("");
    }
  };

  return (
    <div className="field">
      <div className="control">
        <input
          className="input is-large"
          value={todoText}
          onChange={e => setTodoText(e.target.value)}
          type="email"
          placeholder={props.placeholder}
          onKeyUp={addTodo}
        />
      </div>
    </div>
  );
}

function App() {
  const initialTodos = [
    {
      todo: "Buy Bread",
      done: false
    },
    {
      todo: "Buy Milk",
      done: false
    },
    {
      todo: "Buy Onions",
      done: true
    }
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [error, setError] = useState("");

  const markAsDone = todoToChange => {
    const todos2 = todos.map(todo => {
      if (todo.todo === todoToChange.todo) {
        return {
          todo: todo.todo,
          done: !todo.done
        };
      }
      return todo;
    });
    setTodos(todos2);
  };

  const addTodo = todoText => {
    setError(null);
    let hasDuplicateError = false;
    todos.forEach(todo => {
      if (todo.todo.toLowerCase() === todoText.toLowerCase()) {
        hasDuplicateError = true;
      }
    });

    if (hasDuplicateError) {
      setError("Duplicate Todo Item");
      return;
    }

    const newTodoList = todos.concat([
      {
        done: false,
        todo: todoText
      }
    ]);

    setTodos(newTodoList);
  };

  const listOfTodosUI = todos.map(todo => (
    <div key={todo.todo} className="list-item">
      <Todo markAsDone={markAsDone} todo={todo} />
    </div>
  ));

  let showErrorUI = "";

  if (error) {
    showErrorUI = (
      <div className="columns">
        <div className="column is-half is-offset-3">
          <div className="message is-warning">
            <div className="message-body">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title is-1 has-text-centered">Great Todo App</h1>
        {showErrorUI}
        <div className="columns">
          <div className="column is-half is-offset-3">
            <AddTodo addTodo={addTodo} placeholder="Buy Bread, By Onions ..." />
          </div>
        </div>
        <div className="columns">
          <div className="column is-half is-offset-3">
            <div className="list is-full">{listOfTodosUI}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
