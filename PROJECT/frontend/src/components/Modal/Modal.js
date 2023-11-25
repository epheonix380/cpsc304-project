import './Modal.css'

const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div onClick={onClose} className="overlay">
            <div className="modal">
                {children}
            </div>
        </div>
    );
};


export default Modal;