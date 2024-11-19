import * as React from 'react';
import { useEffect, useState } from 'react';
// import { Box } from "@mui/material";
import GenericTable from '../components/GenericTable';

function GameDashboard() {
  const [tableData, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tableHeadings = ['Game_Id', 'Game_Title', 'Game_Short_Title', 'Game_Objective', 'Discipline', 'Subject', 'Faculty', 'Duration_Hours', 'Max_Seats', 'Max_Sessions'];

  // let { apiResponse: gameIdData, apiFailureErrorRes: gameBatchFailureRes, isLoading: gameBatchIsLoading } = FetchDataFromApi('https://loving-humpback-monthly.ngrok-free.app/api/data', true);

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
    <GenericTable inputTableHeadings={tableHeadings} inputTableData={tableData}></GenericTable>
  );
}

export default GameDashboard;