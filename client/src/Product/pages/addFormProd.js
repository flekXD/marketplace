import React, { useState } from 'react';
import axios from 'axios';
import '../../shared/UIElements/form.css'

const AddFormProd = () => {
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productSubcategory, setProductSubcategory] = useState('');
  const [productStatus, setProductStatus] = useState('');
  const [productImg, setProductImg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API with the form data
      await axios.post('http://localhost:3001/product/add', {
        name: productTitle,
        price: parseFloat(productPrice),
        description : productDescription,
        category : productCategory,
        subcategory : productSubcategory,
        status : Boolean(productStatus),
        img : productImg,
      });

      // Clear the form fields after successful submission
      setProductTitle('');
      setProductPrice('');
      setProductDescription('');
      setProductCategory('');
      setProductSubcategory('');
      setProductStatus('');
      setProductImg('');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <body>
        <main>
            <form onSubmit={handleSubmit}>
            <div>
                <label class="large-label">Title:</label>
                <input type="text" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />
            </div>
            <div>
                <label class="large-label">Price:</label>
                <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            </div>
            <div>
                <label class="large-label">Category:</label>
                <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
            </div>
            <div>
                <label class="large-label">Subcategory:</label>
                <input type="text" value={productSubcategory} onChange={(e) => setProductSubcategory(e.target.value)} />
            </div>
            <div>
                <fieldset>
                    <legend class="large-label">It's product in stock?</legend>
                    <input class="small-label" type="radio" name="grid" id="yes" value="true" checked={productStatus === 'true'} onChange={(e) => setProductStatus(e.target.value)}/>
                    <label for="yes">Yes</label>
                    <input class="small-label" type="radio" name="grid" id="no" value="false" checked={productStatus === 'false'} onChange={(e) => setProductStatus(e.target.value)}/>
                    <label for="no">No</label>
                </fieldset>
            </div>
            <div class="full-width">
                <label for="message" class="large-label">Description</label>
                <textarea id="message" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>
            </div>
            <div class="full-width">
                <button type="submit">Send Response</button>
                <button type="reset">Clear Form</button>
            </div>
            </form>
        </main>
    </body>
  );
};

export default AddFormProd;