import React, {useState} from 'react';
import store from "../state/store";
import {observer} from "mobx-react-lite";

const CreateUserModal = observer(({toggleModal}) => {
    const [firstNameInput, setFirstNameInput] = useState('Имя')
    const [lastNameInput, setLastNameInput] = useState('Фамилия')
    const [emailInput, setEmailInput] = useState('email')
    const [urlAvatar, setUrlAvatar] = useState('avatar url')

    const onClickSaveUser = () => {
        store.addUser({firstNameInput, lastNameInput, emailInput, urlAvatar, id: Math.round(Math.random() * 100)})
        toggleModal()
    }

    return (
        <div className="modal">
            <div className="modal__body">
                <div className="modal__content">
                    <input onChange={ (e) => setFirstNameInput(e.target.value)} value={firstNameInput} type="text"/>
                    <input onChange={ (e) => setLastNameInput(e.target.value)} value={lastNameInput} type="text"/>
                    <input onChange={ (e) => setEmailInput(e.target.value)} value={emailInput} type="text"/>
                    <input onChange={ (e) => setUrlAvatar(e.target.value)} value={urlAvatar} type="text"/>
                    <button onClick={onClickSaveUser} className="save-btn">сохранить</button>
                    <button onClick={toggleModal} className="close-btn">Х</button>
                </div>
            </div>
        </div>
    );
})

export default CreateUserModal;