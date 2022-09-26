import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

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


export default function CashBackIncome() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [userData, setUserData] = useState({});
  const [directChilds, setDirectChilds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const columns = [
    { field: "member_id", headerName: "Member ID", minWidth: 100, flex: 1 },
    { field: "paidCashback", headerName: "Paid Cashback", minWidth: 100, flex: 1,renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    { field: "paidDay", headerName: "Paid Day", minWidth: 100, flex: 1 },
    { field: "remaningCashback", headerName: "Remaning CashBack", minWidth: 100, flex: 1,renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    { field: "total_cashback", headerName: "Total CashBack", minWidth: 100, flex: 1,renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    { field: "createdAt", headerName: "Income Date", type: "date", minWidth: 150, flex: 1 },
  ];

  async function getUsersInfo() {
    api
      .post("userInfo", { member_id: userInfo?.user?.member_id })
      .then((res) => {
        console.log("userInfo :: ", res.data.data);
        setUserData({ ...res.data.data });
        setDirectChilds([...res.data.directChild]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  async function cashbackIncome() {
    api
      .post("getCashback", {})
      .then((res) => {
        console.log("CashbackIncome:: ", res.data.Data);
        setTableData([...res.data.Data]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  useEffect(async () => {
    await getUsersInfo();
    await cashbackIncome();
  }, []);
  return (
    <>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg">
            <div className="my-2">
              <div className="d-block mb-4 mb-md-0 mb-2">
                <h2 className="h4 my-0">CashBack Incomes</h2>
              </div>
              <DataGrid
                //loading={loadingData}
                getRowId={(r) => r._id}
                rows={tableData}
                columns={columns}
                pageSize={10}
                autoHeight={true}
                className="bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
