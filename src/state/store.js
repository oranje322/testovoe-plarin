import {makeAutoObservable} from "mobx";

class Store {

    users = []
    openModal = {}
    totalPages = 0
    activePage = 0

    constructor() {
        makeAutoObservable(this)
    }

    //загружаем данные пользователей через get запрос в первый раз
    fetchData() {
        fetch('https://reqres.in/api/users').then(r => r.json()).then(r => {
            // получаем кол-во страниц
            this.totalPages = r.total_pages
            this.setUsers(r.data)
            this.activePage = 1
        }).catch(e => console.error(e))
    }

    //загружаем пользователей в зависимости от страницы
    loadUsers(pageNum) {
        fetch(`https://reqres.in/api/users?page=${pageNum}`).then(r => r.json()).then(r => {
            this.totalPages = r.total_pages
            this.setUsers(r.data)
            this.activePage = pageNum
        }).catch(e => console.error(e))
    }

    //устанавливаем полученных пользователей в массив
    setUsers(users) {
        this.users = [...users]
    }

    //добавляем на сервер пользователя по кнопке "добавить"
    async addUser(user) {
        try {
            const response = await fetch('https://reqres.in/api/users', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Ответ сети был не ok.');
            }
            const json = await response.json();
            console.log('Успех:', JSON.stringify(json));
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    // изменяем пользователя по кнопке "сохранить" в модальном окне
    async saveChangeUser(user) {
        try {
            const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Ответ сети был не ok.');
            }
            const json = await response.json();
            console.log('Успех', json);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    // обновляем пользователя в стейте по кнопке "сохранить" в модальном окне
    updateUser(user) {
        this.users = this.users.map(u => u.id === user.id ? {...user} : u)
    }

    // удаляем пользователя по кнопке "удалить" в модальном окне
    async deleteUser(id) {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Ответ сети был не ok.');
            }
            console.log('пользователь удален')
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    //удаляем пользователя так же и из стора, потому что такое апи и синхронизироваться не получится.
    deleteUserInStore(id) {
        this.users = this.users.filter(u => u.id !== id)
    }
}


export default new Store()
