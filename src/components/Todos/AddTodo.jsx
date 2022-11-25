import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../service/firebaseConfig"
import { addFile } from "../../service/addFile"
import { Loader } from "../Loader/Loader"

export const AddTodo = ({ setActiveModal }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dateCompletion, setDateCompletion] = useState('')
    const [files, setFiles] = useState('')
    const [loading, setLoading] = useState(false)

    const addTodoHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            title: title,
            description: description,
            dateCompletion: dateCompletion,
            completed: false
        }

        addDoc(collection(db, "todos"), data)
            .then(res => addFile(files, res.id))
            .finally(() => {
                setActiveModal(false)
                setLoading(false)
            });

        setTitle('')
        setDescription('')
        setDateCompletion('')
        setFiles('')

    }

    return (
        <form className="form" onSubmit={addTodoHandler}>
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
                <input type='file' multiple accept="image/*" placeholder='Файлы' onChange={(e) => setFiles(e.target.files[0])}></input>
            </label>
            {loading && <Loader />}
            <input className="btn-action btn-save" type='submit' value='Сохранить'></input>
        </form>
    )
}