import React, {useEffect, useState} from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';

const Users = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient ();
  const [loadedUsers, setLoadedUsers] = useState ();

  useEffect (
    () => {
      const fetchUsers = async () => {
        //iiffe
        try {
          const responseData = await sendRequest (
            'http://localhost:5000/api/users'
          );

          setLoadedUsers (responseData.users);
        } catch (err) {}
      };
      fetchUsers ();
    },
    [sendRequest]
  );
  //useEffect empty array bracket makes it so it runs only onece
  //default req type for fetch is GET
  //useEffect does not like async code, use in iife instead

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading &&
        <div className="center">
          <LoadingSpinner />
        </div>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;

//testing
//testing2.0
