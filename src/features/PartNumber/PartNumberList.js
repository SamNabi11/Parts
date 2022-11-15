import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import Button from 'react-bootstrap/Button';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import BtnCellRenderer from './BtnCellRenderer';


const PartNumberList = (props) => {
    const gridRef = useRef(null);
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([])
    const [refreshKey, setRefreshKey] = useState(0);

    

    function updateRefreshKey(){
            setRefreshKey(refreshKey => (refreshKey +1));
           
        //console.log(refreshKey);
        
    };

    useEffect(() => {
        console.log("Calling api");
        fetch(
            "https://d3ttaqb72x3f57.cloudfront.net/")
            //"https://localhost:5232/api/PartNumber")
            .then((res) => res.json())
            .then((data) => setRowData(data))
            ;


    }, [refreshKey])


    const [columnDefs] = useState([
        { field: 'ID', width: 70 },
        {
            field: 'PartNumber', resizable: true, width: 200, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'CompanyPrefix', resizable: true, width: 130, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'LevelName', headerName: 'Level', resizable: true, width: 130, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'OriginName', headerName: 'Origin', resizable: true, width: 130, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'CategoryName', headerName: 'Category', resizable: true, width: 150, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'Revision', resizable: true, width: 150, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'Description', width: 200, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'Action', headerClass: "ag-center-header",
            cellClass: "ag-center-cell",
            width: 300,
            cellRenderer: BtnCellRenderer,

        }
    ])

    const navigateNewPart = () => {
        // 👇️ navigate to /
        navigate('/PartNumber', { replace: true });
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 800, width: 1400 }}>
            <br />
            <br />
            <Button onClick={navigateNewPart}>Create New Part</Button>
            <hr />
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                context={{
                    updateRefreshKey
                }}
                rowSelection="single"
            >
            </AgGridReact>
        </div>
    );
};

export default
    PartNumberList