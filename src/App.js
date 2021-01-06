import React, {useEffect, useState} from 'react';
import './App.scss'
import User from "./components/User";
import AddUser from "./components/AddUser";
import Modal from "./components/Modal";
import store from "./state/store";
import {observer} from "mobx-react-lite";
import Pagination from "./components/Pagination";

const App = observer(() => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    useEffect(  () => {
        store.fetchData()
    },[])

    const openModal = (user) => {
        store.openModal = user
        setIsOpenModal(prev => !prev)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    return (
        <div className={'container'}>
            <div className="users-wrapper">
                {
                    store.users.map(user => <User key={user.id}
                                                  user={user}
                                                  openModal={openModal}/>)
                }
            </div>
            <AddUser/>
            <Pagination/>
            {
                isOpenModal && <Modal closeModal={closeModal}/>
            }
        </div>
    );
})

export default App;