import './Modal.css'

export const Modal = ({ active, setActive, setEdit, children }) => {

    const closeModalHandler = () => {
        setActive(false)
        setEdit(false)
    }
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={closeModalHandler}>
            <div className={active ? 'modal-content active' : 'modal-content'} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}