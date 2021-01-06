import React, {useState} from 'react';
import plus from '../assets/img/plus.svg'
import CreateUserModal from "./CreateUserModal";

const AddUser = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <>
            <button onClick={toggleModal} className={'add-user'}>
                <img className={'add-user__plus'} src={plus} alt="plus"/>
            </button>
            {
                isOpen && <CreateUserModal toggleModal={toggleModal}/>
            }
        </>
    );
};

export default AddUser;