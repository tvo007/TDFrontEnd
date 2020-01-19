import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Tim Vo',
      image: 'https://res.cloudinary.com/ddj5orpun/image/upload/v1569892155/samples/landscapes/beach-boat.jpg',
      skillsCompleted: 0 //link number of skills learnt from DUMMY
    }
  ];
  return <UsersList items={USERS} />;
};

export default Users;
