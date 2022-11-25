import { AddedFiles } from "./AddedFiles"

export const ViewTodo = ({ edit, setEdit, todo }) => {
    return (
        <div className="more">
            <div className="btn-container">
                <button className="btn-edit" onClick={() => setEdit(true)}>
                    <img src='assets/img/edit.svg' />
                </button>
            </div>

            <div>
                <h4>Заголовок</h4>
                <p>{todo.title}</p>
            </div>
            <div>
                <h4>Описание</h4>
                <p>{todo.description}</p>
            </div>
            <div>
                <h4>Дата завершения</h4>
                <p>{todo.dateCompletion}</p>
            </div>
            <div>
                <h4> Добавленные файлы</h4>
                <AddedFiles id={todo.id} edit={edit} />
            </div>

        </div>
    )
}