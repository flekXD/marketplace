import React from "react";

import Card from '../../shared/UIElements/Card'
import './ProductItem.css'

const ProductItem = props =>{
    return (
    <li className="product-item">
        <Card className="product-item__content">
            <div className="product-item__image">
                <img src={props.img} alt={props.title}></img>
            </div>
            <div className="product-item__info">
                <h2>{props.title}</h2>
                <h3>{props.address}</h3>
                <p>{props.descriptions}</p>
            </div>
            <div className="product-item__actions">
                <button>Edit</button>
                <button>Dell</button>

            </div>
        </Card>
    </li>
    )
}

export default PlaceItem;