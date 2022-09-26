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
export default function ROIIncomeHistory() {
  const navigate = useNavigate()
  const [totalIncome, setTotalIncome] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  
  const columns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "total_cashback", headerName: "Amount", width: 200, flex: 1, renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    { field: "perDayCashback", headerName: "Paid Cashback", width: 200, flex: 1, renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    { field: "paidDay", headerName: "Days", width: 200, flex: 1 },
    /* { field: "coin_wallet", headerName: "Vibration wallet", width: 200, flex: 1 },
    { field: "income_wallet", headerName: "Cashoneer wallet", width: 200, flex: 1 }, */
    { field: "createdAt", headerName: "Income Date", type: "date", width: 150, flex: 1 },
  ];

  async function getInvestmentList() {
    api
      .post("getAllCashbackIncomeHistory", {income_type: "cashback_income",})
      .then((res) => {
        //console.log(res.data);
        setIncomes([...res.data.totalInvestments]);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ??
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
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <div className="d-block mb-2 mb-md-0">
          <h2 className="h4">ROI Income History</h2>
        </div>
      </div>
      <div className="table-settings mb-4">
        <div className="my-2">
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
