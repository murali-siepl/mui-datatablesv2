import {
  TableCell,
  TableFooter,
  TableRow,
  makeStyles,
  Box
} from "@material-ui/core";
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import tableData from "./tableData";

const useStyles = makeStyles((theme) => ({
  footerCell: {
    backgroundColor: "grey",
    borderBottom: "none",
    color: "white",
    fontSize: 14,
    fontWeight: "bolder"
  }
}));

const CustomTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const classes = useStyles();

  const columns = [
    { name: "firstName", label: "First Name" },
    { name: "english", lable: "English" },
    { name: "maths", label: "Maths" },
    { name: "science", label: "Science" }
  ];

  const options = {
    customHeadRender: () => null,
    filter: true,
    selectableRows: false,
    filterType: "dropdown",
    responsive: "standard",
    viewColumns: true,
    search: true,
    rowsPerPageOptions: [5, 10, 25, 50],
    onChangeRowsPerPage(numberOfRows) {
      setRowsPerPage(numberOfRows);
    },
    onChangePage(page) {
      setPage(page);
    },
    customTableBodyFooterRender: (opts) => {
      const startIndex = page * rowsPerPage;
      const endIndex = (page + 1) * rowsPerPage;
      let sumEnglish = opts.data
        .slice(startIndex, endIndex)
        .reduce((accu, item) => {
          return accu + item.data[1];
        }, 0);
      let sumMaths = opts.data
        ?.slice(startIndex, endIndex)
        ?.reduce((accu, item) => {
          return accu + item.data[2];
        }, 0);
      let sumScience = opts.data
        .slice(startIndex, endIndex)
        .reduce((accu, item) => {
          return accu + item.data[3];
        }, 0);
      return (
        <>
          {tableData.length > 0 && (
            <TableFooter className={classes.footerCell}>
              <TableRow>
                {opts.columns.map((col, index) => {
                  if (col.display === "true") {
                    if (col.name === "firstName") {
                      return (
                        <TableCell key={index} className={classes.footerCell}>
                          Total
                        </TableCell>
                      );
                    } else if (col.name === "english") {
                      return (
                        <TableCell key={index} className={classes.footerCell}>
                          {sumEnglish}
                        </TableCell>
                      );
                    } else if (col.name === "maths") {
                      return (
                        <TableCell key={index} className={classes.footerCell}>
                          {sumMaths}
                        </TableCell>
                      );
                    } else if (col.name === "science") {
                      return (
                        <TableCell key={index} className={classes.footerCell}>
                          {sumScience}
                        </TableCell>
                      );
                    }
                  }
                })}
              </TableRow>
            </TableFooter>
          )}
        </>
      );
    }
  };

  return (
    <div className={classes.tableContainer}>
      <Box sx={Styles.auditTable}>
        <MUIDataTable
          title="Custom Footer Table"
          data={tableData}
          columns={columns}
          options={options}
        />
      </Box>
      <h5>Created by Ganesh Tatkare</h5>
    </div>
  );
};

export default CustomTable;

const Styles = {
  auditTable: {
    maxWidth: "500px",
    "MuiTableHead-root": {
      background: "grey"
    },
    ".MuiTableCell-footer": {
      fontWeight: 700,
      fontSize: "0.875rem"
    },
    ".MuiButtonBase-root": {
      fontWeight: 700,
      fontSize: "0.875rem"
    }
  }
};
