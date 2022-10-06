import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, vndr_nm, vndr_num, agmnt_num, cntrct_stat_cd, cntrct_catgy_cd, cntrct_eff_dt, cntrct_expir_dt) {
  return {id,  vndr_nm, vndr_num, agmnt_num, cntrct_stat_cd, cntrct_catgy_cd, cntrct_eff_dt, cntrct_expir_dt };
}

const rows = [
  createData(23, 'TEST contract', '32156', '123456', 'Active', 'Category 1', '2021-01-01', '2021-12-31'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Conntract ID</TableCell>
            <TableCell align="right">Vendor Name</TableCell>
            <TableCell align="right">Vendor Number</TableCell>
            <TableCell align="right">Agreement Number</TableCell>
            <TableCell align="right">Contract Status</TableCell>
            <TableCell align="right">Contract Category</TableCell>
            <TableCell align="right">Contract Effective Date</TableCell>
            <TableCell align="right">Contract Expiration Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.vndr_nm}</TableCell>
              <TableCell align="right">{row.vndr_num}</TableCell>
              <TableCell align="right">{row.agmnt_num}</TableCell>
              <TableCell align="right">{row.cntrct_stat_cd}</TableCell>
              <TableCell align="right">{row.cntrct_catgy_cd}</TableCell>
              <TableCell align="right">{row.cntrct_eff_dt}</TableCell>
              <TableCell align="right">{row.cntrct_expir_dt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
