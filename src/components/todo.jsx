import './todo.css'
import { useState } from 'react'

function Todo() {
    const [textbox, Settextbox] = useState("");
    const [task, Settask] = useState([]);

    const addTask = () => {
        if (textbox === "") {
            alert("enter something...");
        } else {
            Settask([...task, { text: textbox, completed: false }]);
            Settextbox("");
        }
    };

    const textboxHandler = (event) => {
        Settextbox(event.target.value);
    };

    const checkboxClickHandler = (index) => {
        const updatedTasks = task.map((item, i) => {
            if (i === index) {
                return { ...item, completed: !item.completed };
            } else {
                return item;
            }
        });
        Settask(updatedTasks);
    };

    return (
        <>
            <div className="todoall">
                <div className="div">
                    <input
                        type="text"
                        value={textbox}
                        placeholder="type something..."
                        onChange={textboxHandler}
                    />
                    <button onClick={addTask}>Add</button>
                </div>
                <ul className="tasks">
                    {task.map((tasks, index) => (
                        <li className="list-checkbox" key={index}>
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    onClick={() => checkboxClickHandler(index)}
                                    className="list-checkbox"
                                    checked={tasks.completed}
                                    readOnly
                                />
                            </div>
                            <span className={tasks.completed ? "completed" : ""}>
                                {tasks.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Todo;
