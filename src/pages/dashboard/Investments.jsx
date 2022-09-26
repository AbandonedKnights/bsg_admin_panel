import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridSearchIcon,
  GridFilterInputDate,
} from "@mui/x-data-grid";
import { Chip, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import React from "react";
export default function Investments() {
  const [tableData, setTableData] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [ti, setTI] = useState(0);
  const columns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "amount", headerName: "Amount", width: 100 },
     { field: "cashbackPoints", headerName: "CashBack Points", width: 150,renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    { field: "paidDay", headerName: "PaidDay", width: 100 },
    { field: "perDayCashback", headerName: "PerDay Cashback", width: 150,renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    { field: "total_cashback", headerName: "Total CashBack", width: 150,renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    // { field: "trans_hash", headerName: " Trans", width: 150 },
    { field: "wallet_address", headerName: "Wallet Address", width: 150 },
    { field: "createdAt", headerName: "Joined On", type: "date", width: 150 },
  ];

  async function getInvestmentList() {
    api
      .post("getAllInvestment", {})
      .then((res) => {
        //console.log(res.data);
        setTI(res.data.totalInvestment);
        setTableData([...res.data.totalInvestments]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, something went wrong."
        );
      });
  }

  function CustomToolbar() {
    return (
      <Stack direction="row" justifyContent="flex-end">
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
          <GridToolbarExport />
          <GridToolbarFilterButton />
        </GridToolbarContainer>
      </Stack>
    );
  }

  const onFilterChange = React.useCallback(async (filterModel) => {
    if (
      filterModel?.items?.[0]?.value &&
      filterModel?.items?.[0]?.value.length > 0
    ) {
      setFilterColumn(filterModel?.items?.[0]?.columnField);
      setFilterValue(filterModel?.items?.[0]?.value);
    }
  }, []);

  useEffect(() => {
    getInvestmentList();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h2 className="h4">All Orders</h2>
        </div>
      </div>
      <div className="table-settings mb-4">
        {/* <div className="row align-items-center justify-content-between">
          <div className="col col-md-6 col-lg-3 col-xl-4">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon2">
                <span className="fas fa-search"></span>
              </span>
              <input
                type="text"
                className="form-control"
                id="exampleInputIconLeft"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
            </div>
          </div>
         <div className="col-4 col-md-2 col-xl-1 pl-md-0 text-right">
            <div className="btn-group">
              <button
                className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="icon icon-sm icon-gray">
                  <span className="fas fa-cog"></span>
                </span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                <span className="dropdown-item font-weight-bold text-dark">
                  Show
                </span>
                <a className="dropdown-item d-flex font-weight-bold" href="#">
                  10{" "}
                  <span className="icon icon-small ml-auto">
                    <span className="fas fa-check"></span>
                  </span>
                </a>
                <a className="dropdown-item font-weight-bold" href="#">
                  20
                </a>
                <a className="dropdown-item font-weight-bold" href="#">
                  30
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <div className="my-2">
          <div className="d-flex justify-content-end"><div>Total Investments : {ti}</div></div>
          <DataGrid
            //loading={loadingData}
            getRowId={(r) => r._id}
            rows={tableData}
            columns={columns}
            //rowCount={totalUsers}
            pageSize={10}
            //rowsPerPageOptions={[10, 25, 25, 50, 100]}
            //checkboxSelection
            //paginationMode="server"
            //onFilterModelChange={onFilterChange}
            //onPageChange={handlePageChange}
            autoHeight={true}
            className="bg-white"
            components={{
             Toolbar: CustomToolbar,
            }}
          />
        </div>
      </div>
    </>
  );
}
