import React from 'react';

const User = ({user, openModal}) => {

    const {first_name, avatar} = user

    return (
        <div className={'user-block'}>
            <div className="photo-block">
                <img onClick={() => openModal(user)} className={'user-img'} src={avatar} alt="avatar"/>
                <p className="user-name">{first_name}</p>
            </div>
        </div>
    );
};

export default User;