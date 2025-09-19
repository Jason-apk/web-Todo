import { useEffect, useState } from "react";
import TodoItem from "../components/todoItem";

function App() {
  type Priority = "low" | "medium" | "strength";
  type Todo = {
    id: number;
    task: string;
    priority: Priority;
  };

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const savedTodos = localStorage.getItem("todos");
  const refreshTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState<Todo[]>(refreshTodos);
  const [filter, setFilter] = useState<Priority | "all">("all");
  const [selectedTasksById, setSelectedTasksById] = useState<Set<Number>>(
    new Set()
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim() == "") {
      alert("please enter task");
      return;
    }
    const newTodo = {
      id: Date.now(),
      task,
      priority,
    };

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setTask(""), setPriority("medium");
    console.log("success ✔", newTodos);
  };
  let filteredTodos: Todo[] = [];

  const allCount = todos.length;
  const strengthCount = todos.filter(
    (todo) => todo.priority == "strength"
  ).length;
  const mediumCount = todos.filter((todo) => todo.priority == "medium").length;
  const lowCount = todos.filter((todo) => todo.priority == "low").length;

  if (filter == "all") {
    filteredTodos = [...todos];
  } else {
    filteredTodos = todos.filter((todo) => todo.priority == filter);
  }

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    return setTodos(newTodos);
  };

  const toggleSelectedTaskById = (id: number) => {
    const newSelected = new Set(selectedTasksById);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTasksById(newSelected);
  };

  const finishSelection = () => {
    const newTodos = todos.filter((todo) => {
      if (selectedTasksById.has(todo.id)) {
        return false;
      } else {
        return true;
      }
    });
    setTodos(newTodos);
    setSelectedTasksById(new Set());
  };

  return (
    <div className="flex flex-col items-center">
      <div className=" w-2/3 flex my-15 gap-4 flex-col bg-base-300 p-5 rounded-2xl  ">
        <div className="flex gap-4 ">
          <input
            value={task}
            onChange={(event) => setTask(event.target.value)}
            placeholder="Enter your task ..."
            type="text"
            className="input w-full"
          />
          <select
            className="select w-full"
            value={priority}
            onChange={(event) => setPriority(event.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="strength">Strength</option>
          </select>
          <button onClick={addTodo} className="btn btn-primary">
            add
          </button>
        </div>
        <div className="flex-1 space-y-3 h-fit">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex-row flex-wrap space-x-5">
              <button
                className={filter == "all" ? "btn btn-primary" : "btn btn-soft"}
                onClick={() => {
                  if (filter !== "all") {
                    setFilter("all");
                  }
                }}
              >
                All ({allCount})
              </button>
              <button
                className={filter == "low" ? "btn btn-primary" : "btn btn-soft"}
                onClick={() => {
                  if (filter !== "low") {
                    setFilter("low");
                  }
                }}
              >
                low ({lowCount})
              </button>
              <button
                className={
                  filter == "medium" ? "btn btn-primary" : "btn btn-soft"
                }
                onClick={() => {
                  if (filter !== "medium") {
                    setFilter("medium");
                  }
                }}
              >
                Medium ({mediumCount})
              </button>
              <button
                className={
                  filter == "strength" ? "btn btn-primary" : "btn btn-soft"
                }
                onClick={() => {
                  if (filter !== "strength") {
                    setFilter("strength");
                  }
                }}
              >
                Strength ({strengthCount})
              </button>
            </div>
            <button
              onClick={finishSelection}
              className="btn btn-primary"
              disabled={selectedTasksById.size == 0}
            >
              End selection ({selectedTasksById.size}){" "}
            </button>
          </div>
          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map((todo) => (
                <TodoItem
                  todo={todo}
                  isSelected={selectedTasksById.has(todo.id)}
                  key={todo.id}
                  deleteTodo={deleteTodo}
                  toggleSelectedTaskById={toggleSelectedTaskById}
                />
              ))}
            </ul>
          ) : (
            <div className=" py-14 flex flex-col items-center ">
              <h3 className="text-9xl">😪</h3>
              <h1 className="mt-5"> Nothing to display</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
