import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../service/firebaseConfig";
import { Modal } from "../Modal/Modal";
import dayjs from 'dayjs'
import { ViewTodo } from "./ViewTodo";
import { EditTodo } from "./EditTodo";

export const TodoItem = ({ todo }) => {
    const [modalEditActive, setModalEditActive] = useState(false)
    const [edit, setEdit] = useState(false)

    const removeHandler = async () => {
        const docRef = doc(db, "todos", todo.id);
        await deleteDoc(docRef)
    }

    const completeHandler = async () => {
        const docRef = doc(db, "todos", todo.id);
        const data = {
            completed: !todo.completed
        }
        await updateDoc(docRef, data)
    }


    const dateDedline = dayjs(todo.dateCompletion).endOf('day')
    const dateToday = dayjs().endOf('day')

    return (
        <>
            <tr className={todo.completed ? 'completed' : dateDedline.diff(dateToday) < 0 ? 'expired' : ''} onClick={() => setModalEditActive(true)}>
                <td>
                    <input type='checkbox' checked={todo.completed} onChange={completeHandler} onClick={(e) => e.stopPropagation()}></input>
                </td>
                <td >{todo.title}</td>
                <td >{dayjs(todo.dateCompletion).format('DD/MM/YYYY')}</td>
                <td>
                    <button className="btn-edit" onClick={() => setEdit(true)}>
                        <img src='assets/img/edit.svg' />
                    </button>
                </td>
                <td>
                    <button className="btn-remove" onClick={removeHandler}>
                        <img src='assets/img/remove.svg' />
                    </button>
                </td>
            </tr>
            <Modal setActive={setModalEditActive} active={modalEditActive} setEdit={setEdit}>
                {edit
                    ? <EditTodo edit={edit} setEdit={setEdit} todo={todo} setModalEditActive={setModalEditActive} />
                    : <ViewTodo edit={edit} setEdit={setEdit} todo={todo} />
                }
            </Modal>
        </>

    )
}