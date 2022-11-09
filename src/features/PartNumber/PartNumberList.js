import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PartNumberList = () => {
   const [rowData,setRowData] = useState([])

   useEffect(() => {
    fetch(
        "https://d3ttaqb72x3f57.cloudfront.net/")
        .then((res) => res.json())
        .then((data) => setRowData(data));
   })
   
   const [columnDefs] = useState([
       { field: 'ID' },
       { field: 'PartNumber' , sortable: true ,filter: true },
       { field: 'Level' , sortable: true ,filter: true  },
       { field: 'Category' , sortable: true ,filter: true  }
   ])

   return (
       <div className="ag-theme-alpine" style={{height: 800, width: 800}}>
           <AgGridReact
               rowData={rowData}
               columnDefs={columnDefs}>
           </AgGridReact>
       </div>
   );
};

export default
 PartNumberList