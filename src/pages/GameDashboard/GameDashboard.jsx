import * as React from 'react';
import { useEffect, useState } from 'react';
import GenericTable from '../../components/GenericTable';
import { getDashboardData } from './services/gameDashboard.js';

function GameDashboard() {
  const [tableData, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tableHeadings = ['Game_Id', 'Game_Title', 'Game_Short_Title', 'Game_Objective', 'Discipline', 'Subject', 'Faculty', 'Duration_Hours', 'Max_Seats', 'Max_Sessions'];

  // let { apiResponse: gameIdData, apiFailureErrorRes: gameBatchFailureRes, isLoading: gameBatchIsLoading } = FetchDataFromApi('https://loving-humpback-monthly.ngrok-free.app/api/data', true);

  useEffect(() => {
        getDashboardData()
        .then((response) => {
          if(response) {
            setData(response.data);
          }
        })
        .catch((err) => setError(err?.message))
        .finally(() => setLoading(false));
  }, []);

  if (loading) return (<div>...Loading</div>);
  if (error) return (<div>...Error</div>);

  return (
    <GenericTable inputTableHeadings={tableHeadings} inputTableData={tableData}></GenericTable>
  );
}

export default GameDashboard;