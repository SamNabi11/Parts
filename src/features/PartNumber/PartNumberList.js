import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PartNumberList = () => {
    const gridRef = useRef(null);
   const [rowData,setRowData] = useState([])

   useEffect(() => {
    console.log("Calling api");
    fetch(
        "https://d3ttaqb72x3f57.cloudfront.net/")
        .then((res) => res.json())
        .then((data) => setRowData(data));
       
   }, [])
   
   const [columnDefs] = useState([
       { field: 'ID' },
       { field: 'PartNumber' , sortable: true ,filter: true },
       { field: 'Level' , sortable: true ,filter: true  },
       { field: 'Category' , sortable: true ,filter: true  }
   ])

   return (
       <div className="ag-theme-alpine" style={{height: 800, width: 800}}>
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