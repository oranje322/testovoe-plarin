import React, {useState} from 'react';
import store from "../state/store";
import {observer} from "mobx-react-lite";

const Modal = observer(({closeModal}) => {
    const {id, email, first_name, last_name, avatar} = store.openModal

    //локальный стейт для контроля за импутами
    const [firstNameInput, setFirstNameInput] = useState(first_name)
    const [lastNameInput, setLastNameInput] = useState(last_name)
    const [emailInput, setEmailInput] = useState(email)

    //сохраняем изменения из модального окна
    const onClickSaveChanges = () => {
        let user = {
            id,
            first_name: firstNameInput,
            last_name: lastNameInput,
            email: emailInput,
            avatar
        }
        //put запрос на сервер с изменением пользователя
        store.saveChangeUser(user)
        //синхронизируем store, т.к. данные подгружается только в первом рендере
        store.updateUser(user)
        //закрываем модальное окно
        closeModal()
    }

    const onClickDeleteUser = () => {
        store.deleteUser(id)
        store.deleteUserInStore(id)
        closeModal()
    }

    return (
        <div className="modal">
            <div className="modal__body">
                <div className="modal__content">
                    <img src={avatar} alt="avatar"/>
                    <input onChange={(e) => setFirstNameInput(e.target.value)} value={firstNameInput} type="text"/>
                    <input onChange={(e) => setLastNameInput(e.target.value)} value={lastNameInput} type="text"/>
                    <input onChange={(e) => setEmailInput(e.target.value)} value={emailInput} type="text"/>
                    <button onClick={onClickDeleteUser} className='delete-btn'>удалить</button>
                    <button onClick={onClickSaveChanges} className="save-btn">сохранить</button>
                    <button onClick={closeModal} className="close-btn">Х</button>
                </div>
            </div>
        </div>
    );
})
export default Modal;