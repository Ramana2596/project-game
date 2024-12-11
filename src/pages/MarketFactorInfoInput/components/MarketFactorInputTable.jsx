import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import GenericTable from '../../../components/GenericTable';
import { useState, useEffect } from 'react';
import AddTableData from '../../../components/AddTableData';
import EditableTableData from '../../../components/EditableTableData';

export default function MarketFactorInputTable({ tableData, isEnableTableActions }) {
    const [isDisableActionBtns, setIsDisableActionBtns] = useState(!isEnableTableActions);
    const [isDisableSubCanBtns, setIsDisableSubCanBtns] = useState(!isEnableTableActions);
    const [isEnableGenericTable, setIsEnableGenericTable] = useState(false);
    const [isEnableTableAdd, setIsEnableTableAdd] = useState(true);
    const [isEnableTableEdit, setIsEnableTableEdit] = useState(true);
    const [checkedRows, setCheckedRows] = useState([]);
    
    const tableHeading = ['Item Description', 'Quantity', 'Info_Qty', 'Unit Price', 'Info Price'];
    const hiddenTableColumns = ['Qty_Id', 'UOM', 'Part', 'Period', 'currency', 'Price_Id'];
    const inputTypes = [{ columnName: 'Item_Description', inputType: 'select' },
    { columnName: 'Info_Qty', inputType: 'select' },
    { columnName: 'Quantity', inputType: 'text' },
    { columnName: 'Unit_Price', inputType: 'text' },
    { columnName: 'Info_Price', inputType: 'select' }]

    useEffect(() => {
        setIsDisableActionBtns(!isEnableTableActions);
    }, [isEnableTableActions]);

    const frameEditableTableData = (() => {

    });

    const onAddBtnClick = () => {
        setIsDisableActionBtns(true);
        setIsDisableSubCanBtns(false);
        setIsEnableTableAdd(false);
        setIsEnableGenericTable(true);
    };

    const onModifyBtnClick = () => {
        setIsDisableActionBtns(true);
        setIsDisableSubCanBtns(false);
        setIsEnableTableEdit(false);
        setIsEnableGenericTable(true);
    };

    const onSubmitBtnClick = () => {
        setIsDisableActionBtns(false);
        setIsDisableSubCanBtns(true);
        setIsEnableTableEdit(true);
        setIsEnableTableAdd(true);
        setIsEnableGenericTable(false);
    };

    const onCancelButtonClick = () => {
        setIsDisableActionBtns(false);
        setIsDisableSubCanBtns(true);
        setIsEnableTableEdit(true);
        setIsEnableTableAdd(true);
        setIsEnableGenericTable(false);
    };

    const handleCheckboxChange = (selectedRows) => { 
        setCheckedRows(selectedRows); 
        console.log('Checked Rows:', selectedRows); 
    };

    return (
        <div>
            <Grid margin={5} container spacing={2} justifyContent="center" alignItems="center">
                <Button disabled={isDisableActionBtns} type="button" variant="contained" onClick={onAddBtnClick}>
                    Add
                </Button>
                <Button disabled={isDisableActionBtns} color="white" type="button" variant="contained" onClick={onModifyBtnClick}>
                    Modify
                </Button>
                <Button disabled={isDisableSubCanBtns} type="button" variant="contained" onClick={onSubmitBtnClick}>
                    Commit Data
                </Button>
                <Button disabled={isDisableSubCanBtns} color="white" type="button" variant="contained" onClick={onCancelButtonClick}>
                    Cancel
                </Button>
            </Grid>
            <div hidden={isEnableGenericTable}>
                <GenericTable inputTableHeadings={tableHeading}
                    inputTableData={tableData}
                    ifNoData={null}
                    hiddenColumns={hiddenTableColumns} />
            </div>
            <div hidden={isEnableTableAdd}>
                <AddTableData editableTableData={tableData}
                inputTableHeadings={tableHeading}
                 hiddenColumns={hiddenTableColumns}
                 onCheckboxChange={handleCheckboxChange}
                 tableInputTypes={inputTypes} />
            </div>
            <div hidden={isEnableTableEdit}>
                <EditableTableData editableTableData={tableData} 
                inputTableHeadings={tableHeading} 
                hiddenColumns={hiddenTableColumns} 
                tableInputTypes={inputTypes} />
            </div>
        </div>
    );
}