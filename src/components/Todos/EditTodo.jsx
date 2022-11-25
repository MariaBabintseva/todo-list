import { updateDoc, doc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../service/firebaseConfig"
import { addFile } from "../../service/addFile"
import { AddedFiles } from "./AddedFiles"
import { Loader } from "../Loader/Loader"

export const EditTodo = ({ todo, setModalEditActive, edit, setEdit }) => {
    const [title, setTitle] = useState(todo.title)
    const [description, setDescription] = useState(todo.description)
    const [dateCompletion, setDateCompletion] = useState(todo.dateCompletion)
    const [files, setFiles] = useState('')
    const [loading, setLoading] = useState(false)

    const updateTodoHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const docRef = doc(db, "todos", todo.id);

        const data = {
            title: title,
            description: description,
            dateCompletion: dateCompletion
        };

        addFile(files, todo.id)

        await updateDoc(docRef, data)
            .finally(() => {
                setModalEditActive(false)
                setEdit(false)
                setLoading(false)
            });
    }

    return (
        <form className="form" onSubmit={updateTodoHandler}>
            <label>
                Заголовок
                <input type='text' placeholder='Зоголовок' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </label>
            <label>
                Описание
                <textarea className="description" placeholder='Описание' value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Дата завершения
                <input type='date' placeholder='Дата завершения' value={dateCompletion} onChange={(e) => setDateCompletion(e.target.value)}></input>
            </label>
            <label>
                Добавленные файлы
                <input type='file' accept="image/*" placeholder='Файлы' onChange={(e) => setFiles(e.target.files[0])}></input>
            </label>
            <AddedFiles id={todo.id} edit={edit} />
            {loading && <Loader />}
            <input className="btn-action btn-save" type='submit' value={loading ? 'Загрузка' : 'Сохранить'}></input>
        </form>
    )
}