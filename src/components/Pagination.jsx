import React from 'react';
import store from "../state/store";
import {observer} from "mobx-react-lite";

const Pagination = observer(() => {
    const pageCount = store.totalPages
    const pageMass = Array(pageCount).fill('')

    const onClickPage = (page) => {
        store.loadUsers(page)
    }

    return (
        <div className={'pagination'}>
            {
                pageMass.map((_, index) => <span key={index} className={`pagination-text ${store.activePage === index +1 ? 'active' : ''}`}
                                                 onClick={ () => onClickPage(index+1)}>{index +1}</span> )
            }
        </div>
    );
})

export default Pagination;