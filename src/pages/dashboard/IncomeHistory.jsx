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
import { useCallback, useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React from "react";
export default function IncomeHistory() {
  const navigate = useNavigate()
  const [refincomes, setrefincomes] = useState([]);
  const [levelincomes, setlevelincomes] = useState([]);

  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  
  const columns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "level", headerName: "Level", width: 150 },
    { field: "income_from", headerName: "Income From", width: 150 },
    { field: "income_type", headerName: "Income Type", width: 150 },
    { field: "amount", headerName: "Amount", width: 200, renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    // { field: "coin_wallet", headerName: "Coin Wallet", width: 200 },
    // { field: "income_wallet", headerName: "Income Wallet", width: 200 },
    { field: "createdAt", headerName: "Date", type: "date", width: 150 }
  ];

  const appcolumns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "level", headerName: "Level", width: 150 },
    { field: "income_from", headerName: "Income From", width: 150 },
    { field: "income_type", headerName: "Income Type", width: 150 },
    { field: "amount", headerName: "Amount", width: 200, renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    // { field: "coin_wallet", headerName: "Coin Wallet", width: 200 },
    // { field: "income_wallet", headerName: "Income Wallet", width: 200 },
    { field: "createdAt", headerName: "Date", type: "date", width: 150 }
  ];


  async function getInvestmentList() {
    api
      .post("getIncomeHistory", {})
      .then((res) => {
        console.log(res.data);
        const levelIncometype = res.data.data.filter((item) => item.income_type == "LevelIncome");
        const refIncometype = res.data.data.filter((item) => item.income_type == "referalIncome");
        console.log("levelincome",[...levelIncometype])
        console.log("Refincome",[...refIncometype])
        setrefincomes([...levelIncometype]);
        setlevelincomes([...refIncometype]);
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
          <h2 className="h4">Level Income History</h2>
          <p className="mb-0">All income history here.</p>
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
        </div> */}
        <div className="my-2">
          <DataGrid
            //loading={loadingData}
            getRowId={(r) => r._id}
            rows={refincomes}
            columns={columns}
            //rowCount={totalUsers}
            pageSize={5}
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

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h2 className="h4">Referal Income History</h2>
          <p className="mb-0">All income history here.</p>
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
        </div> */}
        <div className="my-2">
          <DataGrid
            //loading={loadingData}
            getRowId={(r) => r._id}
            rows={levelincomes}
            columns={appcolumns}
            //rowCount={totalUsers}
            pageSize={5}
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
