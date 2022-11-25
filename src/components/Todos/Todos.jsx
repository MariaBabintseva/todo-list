import { useState } from "react"
import { AddTodo } from "./AddTodo"
import { Modal } from "../Modal/Modal"
import { TodoList } from "./TodoList"

export const Todos = () => {
    const [activeModal, setActiveModal] = useState(false)

    return (
        <div className="Todos">
            <div className="toolbar">
                <button className="btn-action btn-add" onClick={() => setActiveModal(true)}>Добавить</button>
            </div>
            <TodoList />
            <Modal active={activeModal} setActive={setActiveModal}>
                <AddTodo setActiveModal={setActiveModal} />
            </Modal>
        </div>

    )
}