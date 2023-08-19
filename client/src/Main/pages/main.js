import axios from 'axios';
import  React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../reducers/userReducer'
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';



function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

function Main() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const getProdData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getProdData();
  }, []);

  useEffect(() => {
    // Transform data into rows format
    const transformedRows = data.map((row) => ({
      id: row._id,
      title: row.title,
      description: row.description,
      price: row.price,
      category: row.category,
      subcategory: row.subcategory,
      status: row.status,
      img: row.img,
      owner: row.owner,
    }));
    setRows(transformedRows);
  }, [data]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 85 },
    { field: 'title', headerName: 'Title', width: 90,editable: true },
    { field: 'description', headerName: 'Description', width: 120,editable: true },
    { field: 'price', headerName: 'Price', width: 90,editable: true },
    { field: 'category', headerName: 'Category', width: 90,editable: true },
    { field: 'subcategory', headerName: 'Subcategory', width: 90,editable: true },
    { field: 'status', headerName: 'Status', width: 80,editable: true },
    { field: 'img', headerName: 'Image', width: 70 },
    { field: 'owner', headerName: 'Owner', width: 85 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  console.log(rows)
  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
/*import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';


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
};
*/
export default Main;