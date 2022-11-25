import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../service/firebaseConfig";
import { TodoItem } from "./TodoItem";
import { useCollection } from 'react-firebase-hooks/firestore';
import { Loader } from "../Loader/Loader";

export const TodoList = () => {
    const [todoList, setTodoList] = useState([])
    const query = collection(db, "todos")
    const [todos, loading, error] = useCollection(query)

    useEffect(() => {
        const todosData = []
        todos?.forEach((item) => {
            todosData.push({ id: item.id, ...item.data() });
        })
        setTodoList(todosData)

    }, [todos])

    return (
        <>
            {loading && <Loader />}
            {todos && todoList?.length === 0
                ? <p>Список задач пуст</p>
                : <table className="table">
                    <thead className="table-head">
                        <tr>
                            <td>Завершена</td>
                            <td>Заголовок</td>
                            <td>Дата завершения</td>
                        </tr>
                    </thead>

                    <tbody>
                        {todoList?.map((todo) =>
                            <TodoItem key={todo.id} todo={todo} />
                        )}
                    </tbody>

                </table>
            }
        </>


    )
}