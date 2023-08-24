import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import ag, { AgGridReact } from 'ag-grid-react';
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
    const [showOnlyLastRev, setSwitchedState] = useState('true');


    function updateRefreshKey() {
        setRefreshKey(refreshKey => (refreshKey + 1));

        //console.log(refreshKey);

    };

    const loadAfterSwichChange = (e) => {

        setSwitchedState(e.target.checked);

        setRefreshKey(refreshKey => (refreshKey + 1));

        //console.log(refreshKey);

    };

    useEffect((e) => {
        //console.log("Calling api" + "  " + showOnlyLastRev);
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
            field: 'PartNumber', resizable: true, width:200, editable: true, sortable: true, pinned: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell",
            filter: true,
            floatingFilter: true
        },
        {
            field: 'CompanyPrefix' , headerName:'Prefix', resizable: true, width:40, editable: true, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell",floatingFilter: true
        },
        {
            field: 'Level', headerName: 'Level', resizable: true, width:50, editable: true, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell",floatingFilter: true
        },
        {
            field: 'Origin', headerName: 'Origin', resizable: true, width:60, editable: true, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell",floatingFilter: true
        },
        {
            field: 'Category', headerName: 'Category', resizable: true, width:70, editable: true, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell",floatingFilter: true
        },
        {
            field: 'Revision', resizable: true, editable: true, width:50, sortable: true, filter: true, headerClass: "ag-center-header",
            cellClass: "ag-center-cell",floatingFilter: true
        },
        {
            field: 'Description', headerClass: "ag-center-header", filter: true,resizable:true,width:150,
            cellClass: "ag-center-cell",tooltipField: 'Description',
            tooltipComponentParams: { color: '#ececec' }, editable: true,floatingFilter: true
        },
        {
            field: 'Eco', headerClass: "ag-center-header", filter: true,resizable:true,width:150,
            cellClass: "ag-center-cell",tooltipField: 'Eco',
            tooltipComponentParams: { color: '#ececec' }, editable: true,floatingFilter: true
        },
        {
            field: 'UserCreated', headerClass: "ag-center-header", filter: true,resizable:true,width:80,
            cellClass: "ag-center-cell",tooltipField: 'UserCreated',
            tooltipComponentParams: { color: '#ececec' }, editable: true,floatingFilter: true
        },
        {
            field: 'DateCreated', headerClass: "ag-center-header", filter: 'agDateColumnFilter',resizable:true,
            cellClass: "ag-center-cell",tooltipField: 'DateCreated',
            tooltipComponentParams: { color: '#ececec' }, editable: true, floatingFilter: true,width:100,
            filterParams: {
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                   if (cellValue === null) return -1;
                   let cellDate = new Date(cellValue);
                   if (filterLocalDateAtMidnight.getDate() === cellDate.getDate()) {
                     return 0;
                   }
                  if (cellDate < filterLocalDateAtMidnight) {
                      return -1;
                  }
                 if (cellDate > filterLocalDateAtMidnight) {
                     return 1;
                 }
              },
               browserDatePicker: true
            }
        },
        {
            field: 'UserLastChanged', headerClass: "ag-center-header", filter: true,resizable:true,width:80,
            cellClass: "ag-center-cell",tooltipField: 'UserLastChanged',
            tooltipComponentParams: { color: '#ececec' }, editable: true,floatingFilter: true
        },
        {
            field: 'DateLastChanged', headerClass: "ag-center-header", filter: 'agDateColumnFilter',
            cellClass: "ag-center-cell",tooltipField: 'DateLastChanged',
            tooltipComponentParams: { color: '#ececec' }, editable: true, floatingFilter: true,resizable:true,width:100,
            filterParams: {
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                   if (cellValue === null) return -1;
                   let cellDate = new Date(cellValue);
                   if (filterLocalDateAtMidnight.getDate() === cellDate.getDate()) {
                     return 0;
                   }
                  if (cellDate < filterLocalDateAtMidnight) {
                      return -1;
                  }
                 if (cellDate > filterLocalDateAtMidnight) {
                     return 1;
                 }
              },
               browserDatePicker: true
            }
        },
        {
            field: 'Action', headerClass: "ag-center-header",width:100,
            cellClass: "ag-center-cell",
            cellRenderer: BtnCellRenderer,

        }
    ])

    const navigateNewPart = () => {
        // 👇️ navigate to /
        navigate('/PartNumber', { replace: true });
    };

    return (
        <div>
           
            <div className="ag-theme-alpine" style={{ height: 720, width: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    tooltipShowDelay={0}
                    tooltipHideDelay={2000}
                    context={{
                        updateRefreshKey
                    }}
                    rowSelection="single"
                    onGridReady={(grid) => grid.api.sizeColumnsToFit()}
                    // paginationAutoPageSize={true}
                    // pagination={true}
                />
                <Button onClick={navigateNewPart}>Create New Part</Button>
            </div>
            <Form.Check onChange={loadAfterSwichChange}
                    type="switch"
                    id="custom-switch"
                    label="Show Only Last Revision"
                    style={{ height: 20, width: 220 }}
                    defaultChecked={true}
                />
            </div>
    );
};

export default
    PartNumberList
