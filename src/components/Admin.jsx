import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const Admin = (props) => {
  const [dataRows, setDataRows] = useState();
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [color, setColor] = useState("black");
  const [bg, setBg] = useState("black");
  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // Send delete request to your backend API
        await axios.post(`http://localhost:3001/auth/delete/`, {
          email: email,
        });
        // Refresh data after deletion
        setShouldRefresh(!shouldRefresh);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (props.darkmode === "active dark mode") {
      setColor("white");
      setBg("#333");
    } else {
      setColor("black");
      setBg("white");
    }
  }, [props.darkmode]);
  const columns = [
    { field: "id", headerName: "ID", headerClassName: 'super-app-theme--header', },
    { field: "name", headerName: "Name", flex: 1, headerClassName: 'super-app-theme--header', },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    { field: "password", headerName: "Password", flex: 1, headerClassName: 'super-app-theme--header', },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <div className="pointer">
          <button>
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => handleDelete(params.row.email)}
            />
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/action/user/all"
        );
        const rowsWithIds = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setDataRows(rowsWithIds);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [shouldRefresh]);
  console.log(color);
  return (
    <main className="p-4">
      {/* Page content */}
      <div className="p-4">
        <div style={{ width: "100%" }}>
          {dataRows && (
            <DataGrid
              rows={dataRows}
              columns={columns}
              sx={{
                boxShadow: 2,
                // borderColor: borderColor,
                '& .MuiDataGrid-cell': {
                  color: color,
                  fontSize: "16px"
                },
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main'
                },
                '& .super-app-theme--header': {
                  backgroundColor: bg,
                  color: color,
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 20 },
                },
              }}
              pageSizeOptions={[20, 50, 100]}
              disableRowSelectionOnClick
            />
          )}
        </div>
      </div>
    </main>
  );
};
const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = (state) => {
  return {
    darkmode: state.darkmode,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
