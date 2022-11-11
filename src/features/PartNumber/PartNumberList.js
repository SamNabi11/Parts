import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import Button from 'react-bootstrap/Button';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PartNumberList = (props) => {
    const gridRef = useRef(null);
    const navigate = useNavigate();
   const [rowData,setRowData] = useState([])

   useEffect(() => {
    console.log("Calling api");
    fetch(
        "https://d3ttaqb72x3f57.cloudfront.net/")
        .then((res) => res.json())
        .then((data) => setRowData(data));
       
   }, [])
   
   const [columnDefs] = useState([
       { field: 'ID' , width: 50 },
       { field: 'PartNumber', width: 150 , sortable: true ,filter: true },
       { field: 'CompanyPrefix', width: 150 , sortable: true ,filter: true },
       { field: 'Level', width: 100 , sortable: true ,filter: true  },
       { field: 'Origin', width: 100 , sortable: true ,filter: true  },
       { field: 'Category', width: 125 , sortable: true ,filter: true  },
       { field: 'Revision', width: 125 , sortable: true ,filter: true  },
       { field: 'Description', width: 400  }
   ])

   const navigateNewPart = () => {
    // 👇️ navigate to /
    navigate('/PartNumber', { replace: true });
  };

   return (
       <div className="ag-theme-alpine" style={{height: 800, width: 1600}}>
        <br />
        <br />
         <Button onClick={navigateNewPart}>Create New Part</Button>
        <hr />
           <AgGridReact
           ref={gridRef}
               rowData={rowData}
               columnDefs={columnDefs}
                rowSelection="single"
                >
           </AgGridReact>
       </div>
   );
};

export default
 PartNumberList