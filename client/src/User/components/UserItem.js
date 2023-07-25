import React from "react";
import {Link} from "react-router-dom"
import './UserItem.css'
const UserItem = props => {
    return(
        //<Link to={`/user/${props.id}`}>
        <tr>
            <th><Link to={`/user/${props.id}`}>{props.first_name}</Link></th>
            <th ><Link to={`/user/${props.id}`}>{props.last_name}</Link></th>
            <th><Link to={`/user/${props.id}`}>{props.email}</Link></th>
        </tr>
        //</Link>
    );
};


export default UserItem;