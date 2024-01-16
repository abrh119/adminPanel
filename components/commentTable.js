"use client";
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  { field: 'comment', headerName: 'Comments', minWidth: 200 },
  { field: 'toxic', headerName: 'Toxic', minWidth: 150 },
  { field: 'severe_toxic', headerName: 'Severe Toxic', minWidth: 150 },
  { field: 'obscene', headerName: 'Obscene', minWidth: 150 },
  { field: 'threat', headerName: 'Threat', minWidth: 150 },
  { field: 'insult', headerName: 'Insult', minWidth: 150 },
  { field: 'identity_hate', headerName: 'Identity Hate', minWidth: 150 },
];

const CommentTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/comments');
        const formattedData = response.data.data.map((comment) => ({
          id: comment._id,
          ...comment,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to mark this as a client-side component

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={data}
        components={{ Toolbar: GridToolbar }}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default CommentTable;
