import React from "react";

import ProductItem from './ProductItem.js'
import Card from '../../shared/UIElements/Card'
import './ProductList.css'

const ProductList = props => {
    if(props.items.length===0){
        return <div className="product-list center">
            <Card>
                <h2>We don't found anything.</h2>
            </Card>
        </div>

    }

    return <ul className="product-list">
        {props.items.map(product => <ProductItem 
        key={product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        price={product.price}
        category={product.category}
        subcategory={product.subcategory}
        status={product.status}
        img={product.img}
        owner={product.owner}
        />)}
    </ul>
};

export default ProductList;