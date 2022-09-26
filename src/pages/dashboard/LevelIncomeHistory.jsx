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
export default function LevelIncomeHistory() {
  const navigate = useNavigate()
  const [totalIncome, setTotalIncome] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  
  const columns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "level", headerName: "Level", width: 150 },
    { field: "income_from", headerName: "Income From", width: 150 },
    { field: "income_type", headerName: "Income Type", width: 150 },
    { field: "amount", headerName: "Amount", width: 200 },
    // { field: "coin_wallet", headerName: "Coin Wallet", width: 200 },
    // { field: "income_wallet", headerName: "Income Wallet", width: 200 },
    { field: "createdAt", headerName: "Date", type: "date", width: 150 }
  ];

  const appcolumns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "level", headerName: "Level", width: 150 },
    { field: "income_from", headerName: "Income From", width: 150 },
    { field: "income_type", headerName: "Income Type", width: 150 },
    { field: "amount", headerName: "Amount", width: 200,renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    // { field: "coin_wallet", headerName: "Coin Wallet", width: 200 },
    // { field: "income_wallet", headerName: "Income Wallet", width: 200 },
    { field: "createdAt", headerName: "Date", type: "date", width: 150 }
  ];


  async function getInvestmentList() {
    api
      .post("getIncomeHistory", {income_type:"LevelIncome"})
      .then((res) => {
        console.log(res.data);
        setTotalIncome(res.data.totalInvestment);
        setIncomes([...res.data.totalInvestments]);
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
        </div>
      </div>
      <div className="table-settings mb-4">
        <div className="my-2">
        <div className="d-flex justify-content-end">
            <div>Total Level Income : {totalIncome}</div>
          </div>
          <DataGrid
            //loading={loadingData}
            getRowId={(r) => r._id}
            rows={incomes}
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
    </>
  );
}
