import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';


const Main = () =>{
  const [data, setData] = useState([]);

  const getProdData= async () => {
    axios.get('http://localhost:3001/products')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };
  useEffect(() =>{
    getProdData()
  },[]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 110,editable: true },
    { field: 'description', headerName: 'Description', width: 150,editable: true },
    { field: 'price', headerName: 'Price', width: 80,editable: true },
    { field: 'category', headerName: 'Category', width: 100,editable: true },
    { field: 'subcategory', headerName: 'Subcategory', width: 100,editable: true },
    { field: 'status', headerName: 'Status', width: 80,editable: true },
    { field: 'img', headerName: 'Image', width: 100 },
    { field: 'owner', headerName: 'Owner', width: 90 },
  ];

  const rows = data.map((row) =>({
    id: row._id,
    title: row.title,
    description : row.description,
    price : row.price,
    category : row.category,
    subcategory : row.subcategory,
    status : row.status,
    img : row.img,
    owner : row.owner,
}))

  console.log(data);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid editMode="row" rows={rows} columns={columns} />
    </div>
  );
    /*const [data, setData] = useState([]);

    const columns = [
        { field: '_id', headerName: 'ID', width: 150 },
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        { field: 'price', headerName: 'Price', width: 80 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'subcategory', headerName: 'Subcategory', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'img', headerName: 'Image', width: 150 },
        { field: 'owner', headerName: 'Owner', width: 150 },
      ];
      
    useEffect(() => {
      // Fetch data from the backend API
      axios.get('http://localhost:3001/products') // Replace '/api/data' with the actual API endpoint
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    const rows = data.map((row) =>({
        id: row._id,
        title: row.title,
        description : row.description,
        price : row.price,
        category : row.category,
        subcategory : row.subcategory,
        status : row.status,
        img : row.img,
        owner : row.owner
    }))
  
    return (
    <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
      </div>
    );*/
};

export default Main;