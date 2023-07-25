import React from "react";
import UserItem from './UserItem';
import './UserList.css';

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>Error. User not found.</h2>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="styled-table">  
        <thead> 
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
            {props.items.map(user =>(
                <UserItem 
                    key={user.id} 
                    id={user.id} 
                    first_name={user.first_name} 
                    last_name={user.last_name}
                    email={user.email} />
            ))}
            </tbody>
      </table> 
    </div>
  );
};

export default UserList;