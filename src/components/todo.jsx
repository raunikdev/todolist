import './todo.css'
import { useState , useEffect} from 'react'

function Todo() {
    const [textbox, Settextbox] = useState("");
    const [task, Settask] = useState([]);
    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            const parsed = JSON.parse(storedTasks);
            console.log("Loaded tasks:", parsed);         // ✅ Important
            console.log("typeof parsed:", typeof parsed); // ✅ Should be "object"
            console.log("isArray:", Array.isArray(parsed)); // ✅ Should be true
            Settask(parsed);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(task));
        console.log("Tasks saved:", task);
    }, [task]);


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
    const xClickHandler = (index) => {
        const filteredTasks = task.filter((_, i) => i !== index);
        Settask(filteredTasks);
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    };



    return (
        <>
            <div className="todoall">
                <h1>To Do List: </h1>
                <div className="div">
                    <input
                        type="text"
                        value={textbox}
                        placeholder="Type something..."
                        onChange={textboxHandler}
                        className='input-box'
                        onKeyDown={handleKeyPress}

                    />
                    <button onClick={addTask} className='add-button'>Add</button>
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
                            <span className={tasks.completed ? "completed" : "not-completed"}>
                                {tasks.text}
                            </span>
                            <span   className='x'
                                    onClick={() => xClickHandler(index)}>x</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Todo;
