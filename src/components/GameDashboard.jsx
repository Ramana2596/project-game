import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function GameDashboard() {
  const [tableData, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://loving-humpback-monthly.ngrok-free.app/api/data',
          {
            headers: {
              'ngrok-skip-browser-warning': 'true'
            }
          });
        if (!response.ok) {
          throw new Error('Some Error occurred');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return (<div>...Loading</div>);
  if (error) return (<div>...Error</div>);

  return (
    <Box margin={10} sx={{ flexGrow: 1 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Game_Id</StyledTableCell>
              <StyledTableCell align="right">Game_Title</StyledTableCell>
              <StyledTableCell align="right">Game_Short_Title</StyledTableCell>
              <StyledTableCell align="right">Game_Objective</StyledTableCell>
              <StyledTableCell align="right">Discipline</StyledTableCell>
              <StyledTableCell align="right">Subject</StyledTableCell>
              <StyledTableCell align="right">Faculty</StyledTableCell>
              <StyledTableCell align="right">Duration_Hours</StyledTableCell>
              <StyledTableCell align="right">Max_Seats</StyledTableCell>
              <StyledTableCell align="right">Max_Sessions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.Game_Id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Game_Title}</StyledTableCell>
                <StyledTableCell align="right">{row.Game_Short_Title}</StyledTableCell>
                <StyledTableCell align="right">{row.Game_Objective}</StyledTableCell>
                <StyledTableCell align="right">{row.Discipline}</StyledTableCell>
                <StyledTableCell align="right">{row.Subject}</StyledTableCell>
                <StyledTableCell align="right">{row.Faculty}</StyledTableCell>
                <StyledTableCell align="right">{row.Duration_Hours}</StyledTableCell>
                <StyledTableCell align="right">{row.Max_Seats}</StyledTableCell>
                <StyledTableCell align="right">{row.Max_Sessions}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GameDashboard;