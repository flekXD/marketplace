import React from "react";
import UserList from "../components/UserList";

const Users = () =>{
    const Users = [{id : '1', first_name: 'Max', last_name:"Smith", email:"flekx1@gmail.com"}]
    return <UserList items = {Users} />
};
export default Users;