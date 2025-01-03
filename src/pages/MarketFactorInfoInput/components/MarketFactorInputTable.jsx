import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import GenericTable from '../../../components/GenericTable';
import { useState, useEffect } from 'react';
import AddTableData from '../../../components/AddTableData';
import EditableTableData from '../../../components/EditableTableData';

export default function MarketFactorInputTable({ tableData, isEnableTableActions, onSubmitApiCall }) {
    const [isDisableActionBtns, setIsDisableActionBtns] = useState(!isEnableTableActions);
    const [isDisableSubCanBtns, setIsDisableSubCanBtns] = useState(!isEnableTableActions);
    const [isEnableGenericTable, setIsEnableGenericTable] = useState(false);
    const [isEnableTableAdd, setIsEnableTableAdd] = useState(true);
    const [isEnableTableEdit, setIsEnableTableEdit] = useState(true);
    const [checkedRows, setCheckedRows] = useState([]);
    const [newTableData, setNewTableData] = useState([]);
    const [deletedTableData, setDeletedTableData] = useState([]);

    const tableHeading = ['Item Description', 'UOM', 'Quantity', 'Info_Qty', 'Unit Price', 'currency', 'Info Price'];
    const tableHeadingForAdd = ['Item Description', 'Quantity', 'Info_Qty', 'Unit Price', 'Info Price'];
    const hiddenTableColumns = ['Qty_Id', 'Part', 'Period', 'Price_Id'];
    const hiddenTableColumnsForAdd = ['Qty_Id', 'UOM', 'Part', 'Period', 'currency', 'Price_Id'];
    const inputTypes = [
        { columnName: 'Item_Description', inputType: null },
        { columnName: 'UOM', inputType: null },
        { columnName: 'Quantity', inputType: 'text' },
        { columnName: 'Info_Qty', inputType: null },
        { columnName: 'Unit_Price', inputType: 'text' },
        { columnName: 'currency', inputType: null },
        { columnName: 'Info_Price', inputType: null }
    ];

    const inputTypesForAdd = [
        { columnName: 'Item_Description', inputType: 'select' },
        { columnName: 'UOM', inputType: null },
        { columnName: 'Quantity', inputType: 'text' },
        { columnName: 'Info_Qty', inputType: 'select' },
        { columnName: 'Unit_Price', inputType: 'text' },
        { columnName: 'currency', inputType: null },
        { columnName: 'Info_Price', inputType: 'select' }
    ];

    useEffect(() => {
        setIsDisableActionBtns(!isEnableTableActions);
    }, [isEnableTableActions]);

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
        if (!isEnableTableEdit && isEnableTableAdd) {
            onSubmitApiCall(newTableData, deletedTableData, true);
        }
        if (!isEnableTableAdd && isEnableTableEdit) {
            onSubmitApiCall(newTableData, deletedTableData, false);
        }
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

    const updateData = (updatedTableData) => {
        const newData = updatedTableData.filter((updatedItem, index) => {
            const originalItem = tableData[index];
            return Object.keys(updatedItem).some(key => {
                if (key !== 'deleted') {
                    return updatedItem[key] !== originalItem[key];
                }
            });
        });
        const deletedData = updatedTableData.filter((updatedItem, index) => {
            return Object.keys(updatedItem).some(key => {
                if (key === 'deleted') {
                    return updatedItem[key] === true;
                }
            });
        });
        setNewTableData(newData);
        setDeletedTableData(deletedData);
    };


    const handleCheckboxChange = (selectedRows) => {
        setCheckedRows(selectedRows);
        const newData = selectedRows.map((updatedItem, index) => {
            const originalItem = tableData[index];
            const transformedItem = {};
            Object.keys(updatedItem).forEach(key => {
                transformedItem[key] = updatedItem[key].value || null;
            });
            return transformedItem;
        });
        setNewTableData(newData);
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
                    inputTableHeadings={tableHeadingForAdd}
                    hiddenColumns={hiddenTableColumnsForAdd}
                    onCheckboxChange={handleCheckboxChange}
                    tableInputTypes={inputTypesForAdd} />
            </div>
            <div hidden={isEnableTableEdit}>
                <EditableTableData editableTableData={tableData}
                    inputTableHeadings={tableHeading}
                    hiddenColumns={hiddenTableColumns}
                    tableInputTypes={inputTypes}
                    onUpdate={updateData} />
            </div>
        </div>
    );
}
