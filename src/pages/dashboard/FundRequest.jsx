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
import { useNavigate } from "react-router-dom";
import React from "react";
export default function FundRequest() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [pendingFundRequests, setPendingFundRequests] = useState([]);
  const [approvedFundRequests, setApprovedFundRequests] = useState([]);
  const [rejectedFundRequests, setRejectedFundRequests] = useState([]);
  const [totalP, setTotalP] = useState(0);
  const [totalR, setTotalR] = useState(0);
  const [totalA, setTotalA] = useState(0);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const columns = [
    { field: "from", headerName: "Member ID" },
    { field: "amount", headerName: "Amount", minWidth: 100, flex: 1, renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    {
      field: "status",
      headerName: "Request Status",
      //type: "boolean",
      width: 150,
      renderCell: (params) =>
      params.value == 1 ? (
        <Chip label="Approved" color="success" size="small" />
      ) : params.value == 2 ? (
        <Chip label="Rejected" color="warning" size="small" />
      ) : (
        <Chip label="Pending" color="warning" size="small" />
      ),
    },
    {
      field: "createdAt",
      headerName: "Request Date",
      type: "date",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          label="Approve Request"
          onClick={(e) => {
            //history.replace(``);
            console.log(params.row);
            approveRequest(params.row._id, 1);
            //navigate(`associate/${params.row.member_id}`, true);
          }}
          showInMenu
        />,
        <GridActionsCellItem
          label="Reject Request"
          onClick={(e) => {
            //history.replace(``);
            console.log(params.row);
            approveRequest(params.row._id, 2);
            //navigate(`associate/${params.row.member_id}`, true);
          }}
          showInMenu
        />,
      ],
    },
  ];

  const appColumns = [
    { field: "from", headerName: "Member ID" },
    { field: "amount", headerName: "Amount", minWidth: 100, flex: 1 },
    {
      field: "status",
      headerName: "Request Status",
      //type: "boolean",
      width: 150,
      renderCell: (params) =>
        params.value == 1 ? (
          <Chip label="Approved" color="success" size="small" />
        ) : params.value == 2 ? (
          <Chip label="Rejected" color="warning" size="small" />
        ) : (
          <Chip label="Pending" color="warning" size="small" />
        ),
    },
    {
      field: "createdAt",
      headerName: "Request Date",
      type: "date",
      minWidth: 100,
      flex: 1,
    },
  ];

  async function getFundRequests() {
    api
      .post("getAllFundRequests", {})
      .then((res) => {
        console.log(res.data);
        const pending = res.data.totalInvestments.filter((item) => item.status == 0);
        const approved = res.data.totalInvestments.filter((item) => item.status == 1);
        const rejected = res.data.totalInvestments.filter((item) => item.status == 2);
        let t = pending.reduce((old, newv) => {
          return Number(old) + Number(newv.amount);
        }, 0);
        setTotalP(t);
        setPendingFundRequests([...pending]);
        t = approved.reduce((old, newv) => {
          return Number(old) + Number(newv.amount);
        }, 0);
        setTotalA(t);
        setApprovedFundRequests([...approved]);
        t = rejected.reduce((old, newv) => {
          return Number(old) + Number(newv.amount);
        }, 0);
        setTotalR(t);
        setRejectedFundRequests([...rejected]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, something went wrong."
        );
      });
  }

  async function approveRequest(requestID, status) {
    const approveRequest = api.post("approve_fund_request", {
      id: requestID,
      status: status,
    });
    toast
      .promise(approveRequest, {
        loading: "Updating request status.",
        success: (data) => {
          return status == 1 ? "Request approved successfully." : "Request rejected successfully.";
        },
        error: (error) => {
          return error.message ?? "Something went wrong.";
        },
      })
      .then(() => {
        getFundRequests();
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
    getFundRequests();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h2 className="h4">Fund Requests</h2>
        </div>
      </div>
      <div className="table-settings mb-4">
        <div className="my-2">
          <h5>Pending Requests</h5>
          <div className="d-flex justify-content-end"><div>Total Pending : {totalP}</div></div>
          <DataGrid
            getRowId={(r) => r._id}
            rows={pendingFundRequests}
            columns={columns}
            pageSize={10}
            autoHeight={true}
            className="bg-white"
            components={{
              Toolbar: CustomToolbar,
            }}
            density="compact"
          />
        </div>

        <div className="my-2">
          <h5>Approved Requests</h5>
          <div className="d-flex justify-content-end"><div>Total Approved : {totalA}</div></div>
          <DataGrid
            getRowId={(r) => r._id}
            rows={approvedFundRequests}
            columns={appColumns}
            pageSize={10}
            autoHeight={true}
            className="bg-white"
            components={{
              Toolbar: CustomToolbar,
            }}
            density="compact"
          />
        </div>

        <div className="my-2">
          <h5>Rejected Requests</h5>
          <div className="d-flex justify-content-end"><div>Total Rejected : {totalR}</div></div>
          <DataGrid
            getRowId={(r) => r._id}
            rows={rejectedFundRequests}
            columns={appColumns}
            pageSize={10}
            autoHeight={true}
            className="bg-white"
            components={{
              Toolbar: CustomToolbar,
            }}
            density="compact"
          />
        </div>
      </div>
    </>
  );
}
