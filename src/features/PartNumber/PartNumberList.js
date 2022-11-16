import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import BtnCellRenderer from './BtnCellRenderer';


const PartNumberList = (props) => {
    const gridRef = useRef(null);
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([])
    const [refreshKey, setRefreshKey] = useState(0);
    const [showOnlyLastRev, setSwitchedState] = useState('false');


    function updateRefreshKey() {
        setRefreshKey(refreshKey => (refreshKey + 1));

        //console.log(refreshKey);

    };

    const loadAfterSwichChange = (e) => {

        setSwitchedState(e.target.checked);

        setRefreshKey(refreshKey => (refreshKey + 1));

        //console.log(refreshKey);

    };

    useEffect(() => {
        console.log("Calling api" + "  " + showOnlyLastRev);
        let url = "https://d3ttaqb72x3f57.cloudfront.net/GetPartsList";
            //"https://localhost:5232/api/PartNumber/GetPartsList";
        let res = fetch(url, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                LoadLastRevision: showOnlyLastRev,
            }),
        }).then((res) => res.json())
            .then((data) => setRowData(data));;



    }, [refreshKey])


    const [columnDefs] = useState([
       // { field: 'ID', width: 50, pinned: true },
        {
            field: 'PartNumber', resizable: true, width: 180, sortable: true, filter: true, pinned: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'CompanyPrefix', resizable: true, width: 90, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'LevelName', headerName: 'Level', resizable: true, width: 110, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'OriginName', headerName: 'Origin', resizable: true, width: 110, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'CategoryName', headerName: 'Category', resizable: true, width: 110, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'Revision', resizable: true, width: 90, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell"
        },
        {
            field: 'Description', width: 200, headerClass: "ag-center-header", filter: true,
            cellClass: "ag-center-cell"
        },
        {
            field: 'DateCreated', width: 150, headerClass: "ag-center-header", filter: true,
            cellClass: "ag-center-cell"
        },
        {
            field: 'DateLastChanged', width: 150, headerClass: "ag-center-header", filter: true,
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
        <div>
            <div className="mb-3">
               
                <Button onClick={navigateNewPart}>Create New Part</Button>
                <Form.Check onChange={loadAfterSwichChange}
                    type="switch"
                    id="custom-switch"
                    label="Show Only Last Revision"
                    style={{ height: 20, width: 220 }}
                />
                
            </div>
            <div className="ag-theme-alpine" style={{ height: 800, width: 1400 }}>
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
        </div>
    );
};

export default
    PartNumberList