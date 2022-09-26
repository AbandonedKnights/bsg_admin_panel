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
import getWeb3 from "../../web3imp/getWeb3";
import {
  ContractABI,
  ContractAddress,
  TokenABI,
  TokenAddress,
} from "../../web3imp/config";
import { connection, setWalletInfo } from "../../redux/User";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "bootstrap";

export default function WithdrawlRequest() {
  const dispatch = useDispatch();
  const { isLoggedIn, userInfo, isWalletConnected, walletInfo } = useSelector(
    (state) => state?.user?.value
  );
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [pendingFundRequests, setPendingFundRequests] = useState([]);
  const [approvedFundRequests, setApprovedFundRequests] = useState([]);
  const [rejectedFundRequests, setRejectedFundRequests] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const columns = [
    { field: "member_id", headerName: "Member ID" },
    {
      headerName: "Wallet Address",
      minWidth: 100,
      flex: 1,
      renderCell:(params)=>{
        return params.row.userInfo[0].xcelpay_wallet ?? "Wallet not updated."
      }
    },
    /* {
      field: "txn_hash",
      headerName: "Transaction Hash",
      minWidth: 100,
      flex: 1,
    }, */
    { field: "amount", headerName: "Amount", minWidth: 100, flex: 1, renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span> },
    {
      field: "wallet_type",
      headerName: "From Wallet",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return {
          income_wallet: "Cashoneer Wallet",
          cashback_wallet: "Moneypal Wallet",
        }[params.value];
      },
    },
    /* {
      field: "is_approved",
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
    }, */
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
            approveRequest(
              params.row._id,
              1,
              params.row.member_id,
              params.row.amount,
              params.row.wallet_address,
              params.row.wallet_type
            );
            //navigate(`associate/${params.row.member_id}`, true);
          }}
          showInMenu
        />,
        <GridActionsCellItem
          label="Reject Request"
          onClick={(e) => {
            //history.replace(``);
            console.log(params.row);
            approveRequest(
              params.row._id,
              2,
              params.row.member_id,
              params.row.amount,
              params.row.wallet_address,
              params.row.wallet_type
            );
            //navigate(`associate/${params.row.member_id}`, true);
          }}
          showInMenu
        />,
      ],
    },
  ];

  const appColumns = [
    { field: "member_id", headerName: "Member ID" },
    {
      headerName: "Wallet Address",
      minWidth: 100,
      flex: 1,
      renderCell:(params)=>{
        return params.row.userInfo[0].xcelpay_wallet ?? "Wallet not updated."
      }
    },
    {
      field: "txn_hash",
      headerName: "Txn Hash",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return {
          income_wallet: "Cashoneer Wallet",
          cashback_wallet: "Moneypal Wallet",
        }[params.value];
      },
    },
    /* {
      field: "txn_hash",
      headerName: "Transaction Hash",
      minWidth: 100,
      flex: 1,
    }, */
    { field: "amount", headerName: "Amount", minWidth: 100, renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span>},
    // {
    //   field: "wallet_type",
    //   headerName: "From Wallet",
    //   minWidth: 150,
    //   renderCell: (params) => {
    //     return {
    //       income_wallet: "Cashoneer Wallet",
    //       cashback_wallet: "Moneypal Wallet",
    //     }[params.value];
    //   },
    // },
    /* {
      field: "is_approved",
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
    }, */
    {
      field: "createdAt",
      headerName: "Request Date",
      type: "date",
      minWidth: 100,
      flex: 1,
    },
  ];

  const appColumns1 = [
    { field: "member_id", headerName: "Member ID" },
    {
      headerName: "Wallet Address",
      minWidth: 100,
      flex: 1,
      renderCell:(params)=>{
        return params.row.userInfo[0].xcelpay_wallet ?? "Wallet not updated."
      }
    },
    {
      field: "txn_hash",
      headerName: "Txn Hash",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return {
          income_wallet: "Cashoneer Wallet",
          cashback_wallet: "Moneypal Wallet",
        }[params.value];
      },
    },
    /* {
      field: "txn_hash",
      headerName: "Transaction Hash",
      minWidth: 100,
      flex: 1,
    }, */
    { field: "amount", headerName: "Amount", minWidth: 100,renderCell: (params) =><span>{Number(params.value).toFixed(2)}</span>},
    // {
    //   field: "wallet_type",
    //   headerName: "From Wallet",
    //   minWidth: 150,
    //   renderCell: (params) => {
    //     return {
    //       income_wallet: "Cashoneer Wallet",
    //       cashback_wallet: "Moneypal Wallet",
    //     }[params.value];
    //   },
    // },
    /* {
      field: "is_approved",
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
    }, */
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
      .post("all_withdrawl_requests", {})
      .then((res) => {
        console.log("totalData",res.data);
        const pendingr = res.data.filter((item) => item.is_approved == 0);
        const approved = res.data.filter((item) => item.is_approved == 1);
        const rejected = res.data.filter((item) => item.is_approved == 2);
        console.log("Pending",[...pendingr])
        console.log("Approved",[...approved])
        console.log([...rejected])
        
        console.log("Pending",pendingFundRequests);
        setApprovedFundRequests([...approved]);
        setRejectedFundRequests([...rejected]);
        setPendingFundRequests([...pendingr]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, something went wrong."
        );
      });
  }

  async function approveRequest(
    requestID,
    status,
    memberID,
    amount,
    walletAddress,
    fromWallet
  ) {
    const approveRequest = api.post("approve_withdrawl_request", {
      id: requestID,
      status: status,
      txn_hash: ''//data.transactionHash
    });
    toast
      .promise(approveRequest, {
        loading: "Updating request status.",
        success: (data) => {
          return status == 1
            ? "Request approved successfully."
            : "Request rejected successfully.";
        },
        error: (error) => {
          return error.message ?? "Something went wrong.";
        },
      })
      .then(() => {
        getFundRequests();
      });

    /* if (status == 1 && isWalletConnected) {
      onDeposit(
        amount,
        requestID,
        status,
        memberID,
        walletAddress,
        fromWallet
      ).then(() => {
      });
    } else if (status == 1 && !isWalletConnected) {
      toast.error("Please connect your wallet");
      return;
    } */
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

  const onConnect = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await getWeb3();
        const contract = new web3.eth.Contract(ContractABI, ContractAddress);
        const token_contract = new web3.eth.Contract(TokenABI, TokenAddress);
        const accounts = await web3.eth.getAccounts();
        web3.currentProvider.on("accountsChanged", function (accounts) {
          window.location.reload();
        });
        const balance = await new web3.eth.getBalance(accounts[0]);
        web3.currentProvider.on("networkChanged", function (networkId) {
          //window.location.reload();
        });
        window.userAddress = accounts[0];
        window.contract = contract;
        window.balance = balance / 1e18;
        window.token_contract = token_contract;
        const wInfo = {
          userWalletAddress: accounts[0],
          contract: ContractAddress,
          balance: balance,
          tokenContract: TokenAddress,
        };
        dispatch(connection({ isWalletConnected: true }));
        dispatch(setWalletInfo({ walletInfo: wInfo }));
        resolve("connected");
      } catch (err) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        reject("Error");
        console.error(err);
      }
    });
  };

  function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return String(x);
  }

  const onDeposit = (
    amount,
    requestID,
    status,
    memberID,
    walletAddress,
    fromWallet
  ) => {
    return new Promise(async (resolve, reject) => {
      if (isWalletConnected) {
        console.log(
          "Balance: " + walletInfo.balance,
          walletInfo.balance >= amount
        );
        if (walletInfo.balance >= amount) {
          if(walletAddress && walletAddress.length > 0) {
            const newAmount = toFixed(amount * 1e18);
          const apporovalRequest = window.token_contract.methods
            .approve(ContractAddress, newAmount.toString())
            .send({ from: window.userAddress, value: 0 });
          //setDisableAddFund(true);
          toast
            .promise(apporovalRequest, {
              loading: "Transaction approval is pending....",
              success: (data) => {
                return "Transaction approved.";
              },
              error: (error) => {
                //setDisableAddFund(false);
                return error.message ?? "Approval request failed.";
              },
            })
            .then(() => {
              const depositRequest = window.contract.methods
                .userWithdraw(
                  walletAddress,
                  newAmount.toString(),
                  requestID
                )
                .send({ from: window.userAddress, value: 0 });
              toast
                .promise(depositRequest, {
                  loading: "Deposit in progress...",
                  success: (data) => {
                    console.log(data);
                    return "Deposite successful.";
                  },
                  error: (error) => {
                    return "Deposit failed.";
                  },
                })
                .then((data) => {
                  console.log(data);
                  const approveRequest = api.post("approve_withdrawl_request", {
                    id: requestID,
                    status: status,
                    txn_hash: data.transactionHash
                  });
                  toast
                    .promise(approveRequest, {
                      loading: "Updating request status.",
                      success: (data) => {
                        return status == 1
                          ? "Request approved successfully."
                          : "Request rejected successfully.";
                      },
                      error: (error) => {
                        return error.message ?? "Something went wrong.";
                      },
                    })
                    .then(() => {
                      getFundRequests();
                    });
                });
            });
          } else {
            toast.error("Wallet address not found.");
          }
        } else {
          toast.error("You have insuffecient balance.");
        }
      }
    });
  };

  useEffect(async () => {
    await getFundRequests();
  }, []);
  return (
    <>
      <div className="my-2">
        <div className="d-flex justify-content-between">
          <div>
            <h2 className="h4">Withdrawl Requests</h2>
          </div>
          {/* {isWalletConnected ? (
            <div className="fw-bold">
              <span>Connected Wallet : </span>
              {isWalletConnected && walletInfo?.userWalletAddress}
            </div>
          ) : (
            <div>
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="connect_wallet"
                onClick={async (e) => {
                  onConnect();
                }}
              >
                Connect Wallet
              </button>
            </div>
          )} */}
        </div>
      </div>
      <div className="table-settings mb-4">
        <div className="my-2">
          <h5>Pending Requests</h5>
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
          <DataGrid
            getRowId={(r) => r._id}
            rows={rejectedFundRequests}
            columns={appColumns1}
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

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}