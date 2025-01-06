import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import GenericTable from '../../../components/GenericTable';
import { useState, useEffect } from 'react';
import AddTableData from '../../../components/AddTableData';
import EditableTableData from '../../../components/EditableTableData';
import { useUser } from '../../../core/access/userContext';
import { getMarketFactorInfoTableData } from '../services/marketFactorInputService';

export default function MarketFactorInputTable({ tableData, isEnableTableActions, onSubmitApiCall, selectedMarketInput }) {
    const [isDisableActionBtns, setIsDisableActionBtns] = useState(!isEnableTableActions);
    const [isDisableSubCanBtns, setIsDisableSubCanBtns] = useState(!isEnableTableActions);
    const [isEnableGenericTable, setIsEnableGenericTable] = useState(false);
    const [isEnableTableAdd, setIsEnableTableAdd] = useState(true);
    const [isEnableTableEdit, setIsEnableTableEdit] = useState(true);
    const [checkedRows, setCheckedRows] = useState([]);
    const [newTableData, setNewTableData] = useState([]);
    const [deletedTableData, setDeletedTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addTableData, setAddTableData] = useState([
        { columnName: 'Item_Description', inputType: 'select' },
        { columnName: 'UOM', inputType: null },
        { columnName: 'Quantity', inputType: 'text' },
        { columnName: 'Info_Qty', inputType: 'select' },
        { columnName: 'Unit_Price', inputType: 'text' },
        { columnName: 'currency', inputType: null },
        { columnName: 'Info_Price', inputType: 'select' }
    ]);
    const { userInfo } = useUser();

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

    let inputTypesForAdd = [
        { columnName: 'Item_Description', inputType: 'select' },
        { columnName: 'Quantity', inputType: 'text' },
        { columnName: 'Info_Qty', inputType: 'select' },
        { columnName: 'Unit_Price', inputType: 'text' },
        { columnName: 'Info_Price', inputType: 'select' }
    ];

    useEffect(() => {
        setIsDisableActionBtns(!isEnableTableActions);
    }, [isEnableTableActions]);

    useEffect(() => {
        if (!isEnableTableAdd) {
            const fetchData = async () => {
                try {
                    const partPromise = getMarketFactorInfoTableData({
                        gameId: userInfo?.gameId,
                        gameBatch: userInfo?.gameBatch,
                        productionMonth: null,
                        marketInputId: selectedMarketInput?.marketInputId,
                        partCategory: selectedMarketInput?.partCategory,
                        refTypeInfo: null,
                        refTypePrice: null,
                        cmdLine: 'Get_Part'
                    }).then((data) => {
                        inputTypesForAdd.forEach((inputTypeObj) => {
                            if (inputTypeObj.columnName === 'Item_Description') {
                                inputTypeObj.data = data.data?.map((dataObj) => { 
                                    return { value: dataObj?.Part, label: dataObj?.Description }; 
                                });
                            }
                        });
                    });
    
                    const qtyPromise = getMarketFactorInfoTableData({
                        gameId: userInfo?.gameId,
                        gameBatch: userInfo?.gameBatch,
                        productionMonth: null,
                        marketInputId: selectedMarketInput?.marketInputId,
                        partCategory: selectedMarketInput?.partCategory,
                        refTypeInfo: null,
                        refTypePrice: null,
                        cmdLine: 'Get_Qty_Id'
                    }).then((data) => {
                        inputTypesForAdd.forEach((inputTypeObj) => {
                            if (inputTypeObj.columnName === 'Info_Qty') {
                                inputTypeObj.data = data.data?.map((dataObj) => { 
                                    return { value: dataObj?.Info_Qty_Id, label: dataObj?.Info_On_Qty }; 
                                });
                            }
                        });
                    });
    
                    const pricePromise = getMarketFactorInfoTableData({
                        gameId: userInfo?.gameId,
                        gameBatch: userInfo?.gameBatch,
                        productionMonth: null,
                        marketInputId: selectedMarketInput?.marketInputId,
                        partCategory: selectedMarketInput?.partCategory,
                        refTypeInfo: null,
                        refTypePrice: null,
                        cmdLine: 'Get_Price_Id'
                    }).then((data) => {
                        inputTypesForAdd.forEach((inputTypeObj) => {
                            if (inputTypeObj.columnName === 'Info_Price') {
                                inputTypeObj.data = data.data?.map((dataObj) => { 
                                    return { value: dataObj?.Price_Id, label: dataObj?.Info_On_Price }; 
                                });
                            }
                        });
                    });
    
                    // Wait for all promises to complete
                    await Promise.all([partPromise, qtyPromise, pricePromise]);
    
                    setAddTableData([...inputTypesForAdd]);
                    setLoading(false); // All data fetched, set loading to false
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setLoading(false); // Ensure loading is set to false in case of error
                }
            };
    
            fetchData();
        }
    }, [isEnableTableAdd]);
    

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
                if(key === 'Item_Description') { 
                    transformedItem['Part'] = updatedItem[key].value || null;
                } else {
                    transformedItem[key] = updatedItem[key].value || null;
                }
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
            {!loading && (
                <div hidden={isEnableTableAdd}>
                    <AddTableData 
                        inputTableHeadings={tableHeadingForAdd}
                        hiddenColumns={hiddenTableColumnsForAdd}
                        onCheckboxChange={handleCheckboxChange}
                        tableInputTypes={addTableData}
                        resetKey={isEnableTableAdd}
                    />
                </div>
            )}
            <div hidden={isEnableTableEdit}>
                <EditableTableData editableTableData={tableData}
                    inputTableHeadings={tableHeading}
                    hiddenColumns={hiddenTableColumns}
                    tableInputTypes={inputTypes}
                    onUpdate={updateData}
                />
            </div>
        </div>
    );
}
