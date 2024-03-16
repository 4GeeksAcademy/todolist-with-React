import React, { useEffect, useState } from "react";

const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [hover, setHover] = useState(null);

    const createUser = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/ines5388', { 
            method:'POST',
            body: JSON.stringify([]),
            headers:{'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log("error"))
    };

    const getTodos = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/ines5388', {
            method:'GET',
        })
        .then((response) => {
            if (response.status === 404) {
                createUser();
                return [];
            }
            return response.json();
        })
        .then((data) => {
            setTodoList(data);
        })
        .catch((error) => console.log(error))
    };

    const updateTodos = () => {  
        fetch('https://playground.4geeks.com/apis/fake/todos/user/ines5388', {
            method:'PUT',
            body: JSON.stringify(todoList),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.status === 404) {
                createUser();
                return todoList;
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.log(error))
    };

    const cleanAllTodos = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/ines5388', {
          method: "DELETE",
          headers:{
            "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => setTodoList([]))
        .catch(error => console.log(error));
    };

    const onPressEnter = (e) => {
        if (e.key === "Enter") {
            setTodoList(todoList.concat({ label: e.target.value, done:false}));
            setInputValue("");
        }
    };

    const onDeleteIconClick = (elem, index) => {
        if (todoList.length === 1) {
            cleanAllTodos();
        } else {
            setTodoList(todoList.filter((elem, i) => index !== i));
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        if (todoList.length > 0) {
            updateTodos();
        }
    }, [todoList]);

    return (
        <div className="principal">
            <p className="fw-lighter">todos</p>
            <div className="tarjeta">
                <input
                    type="text"
                    placeholder="What needs to be done?" 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyDown={onPressEnter} 
                    value={inputValue}
                />

                <ul>
                    {todoList.length > 0 ? todoList.map((elem, index) => (
                        <li 
                            key={index}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(null)}
                        >
                            {elem.label} 
                            <i className={`fas fa-times icono ${index === hover ? "hover" : "" }`}
                                onClick={() => onDeleteIconClick(elem, index)}
                            />
                        </li>
                    )) : (
                        <li className="agregarTarea">No hay tareas, añadir tareas</li>
                    )}
                </ul>    
                <div className="contador">{todoList.length} item left</div>
                {todoList.length > 0 && (
                    <button className="btn btn-danger m-2" onClick={cleanAllTodos}>Clean All Tasks</button>
                )}
            </div>
            <div className="tarjeta2"></div>
            <div className="tarjeta3"></div>
        </div>
    );
};

export default TodoList;
