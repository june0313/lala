import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Box,
    Button,
    InputBase,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {
    CustomInputBase,
    CustomMenuItem,
    StyledTableCell,
    StyledTableHeader,
    StyledTableHeaderRow
} from '../custom/Tables';
import {Category, CategoryApi} from "../../api/CategoryApi";
import {Ledger, LedgerApi} from "../../api/LedgerApi";

interface VariableExpensesInputProps {
    title: string
    year: number,
    month: number
}

export default function VariableExpensesInput(props: VariableExpensesInputProps) {
    const [cache, setCache] = useState('');
    const [expensesCategories, setExpensesCategories] = useState<Category[]>([]);
    const [variableExpensesLedgers, setVariableExpensesLedgers] = useState<Ledger[]>([]);

    useEffect(() => {
        CategoryApi.getExpensesCategories()
            .then(categories => {
                setExpensesCategories(categories);
            })
    }, [props]);

    useEffect(() => {
        LedgerApi.findVariableExpenses(props.year, props.month)
            .then(ledgers => setVariableExpensesLedgers(ledgers));
    }, [props])

    function addNewLedgerRow() {
        const newLedgers = [...variableExpensesLedgers];
        newLedgers.push({
            amount: 0,
            memo: '',
            categoryId: 0,
            categoryName: '',
            subCategoryId: 0,
            subCategoryName: '',
            year: props.year,
            month: props.month
        });
        setVariableExpensesLedgers(newLedgers);
    }

    function onCategoryChange(event: SelectChangeEvent<number | null>, index: number) {
        event.preventDefault()

        const category = expensesCategories.find(category => category.categoryId === event.target.value);

        const newLedgers = [...variableExpensesLedgers];
        const currentLedger = newLedgers[index];
        currentLedger.categoryId = category!.categoryId;
        currentLedger.categoryName = category!.name;

        const firstSubCategory = category?.subCategories[0];
        currentLedger.subCategoryId = firstSubCategory!.subCategoryId
        currentLedger.subCategoryName = firstSubCategory!.name;

        setVariableExpensesLedgers(newLedgers);
        updateLedger(currentLedger, index);
    }

    function onSubCategoryChange(event: SelectChangeEvent<number | null>, categoryId: number | undefined, index: number) {
        event.preventDefault()

        const subCategory = expensesCategories.filter(category => category.categoryId === categoryId)
            .flatMap(category => category.subCategories)
            .find(subCategory => subCategory.subCategoryId === event.target.value);

        const newLedgers = [...variableExpensesLedgers];

        const currentLedger = newLedgers[index];

        currentLedger.subCategoryId = subCategory!.subCategoryId;
        currentLedger.subCategoryName = subCategory!.name;

        setVariableExpensesLedgers(newLedgers);
        updateLedger(currentLedger, index);
    }

    function onDayChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newLedgers = [...variableExpensesLedgers];
        const day = Number(event.target.value.replace(/\D/g, ''));
        newLedgers[index].day = day == 0 ? undefined : day

        setVariableExpensesLedgers(newLedgers)
    }

    function onMemoChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newLedgers = [...variableExpensesLedgers];
        newLedgers[index].memo = event.target.value;
        setVariableExpensesLedgers(newLedgers)
    }

    function onAmountChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newLedgers = [...variableExpensesLedgers];
        newLedgers[index].amount = Number(event.target.value.replace(/\D/g, ''));
        setVariableExpensesLedgers(newLedgers);
    }

    function onFocus(event: React.FocusEvent<HTMLTableCellElement>, ledger: Ledger) {
        event.target.style.backgroundColor = "#D0ECE7"
        event.currentTarget.style.backgroundColor = "#D0ECE7"

        setCache(JSON.stringify(ledger))
    }

    function updateLedger(ledger: Ledger, index: number) {
        LedgerApi.updateLedger(ledger)
            .then(r => {
                const newLedgers = [...variableExpensesLedgers];
                newLedgers[index].id = r.id;
                setVariableExpensesLedgers(newLedgers);
            })
        // .then(() => props.onChange())
    }

    function onBlur(event: React.FocusEvent<HTMLTableCellElement>, ledger: Ledger, index: number) {
        event.target.style.backgroundColor = "white"
        event.currentTarget.style.backgroundColor = "white"

        if (cache != JSON.stringify(ledger)) {
            updateLedger(ledger, index);
        }

        setCache('')
    }

    return (
        <Box>
            <Typography variant="h6" mt={1} ml={1}>
                {props.title}
            </Typography>

            <TableContainer component={Paper}>
                <Table size={'small'}>
                    <TableHead>
                        <StyledTableHeaderRow>
                            <StyledTableHeader width={"10%"}>날짜</StyledTableHeader>
                            <StyledTableHeader width={"15%"}>대분류</StyledTableHeader>
                            <StyledTableHeader width={"15%"}>소분류</StyledTableHeader>
                            <StyledTableHeader width={"20%"}>메모</StyledTableHeader>
                            <StyledTableHeader width={"10%"}>결제 수단</StyledTableHeader>
                            <StyledTableHeader width={"15%"}>금액</StyledTableHeader>
                        </StyledTableHeaderRow>
                    </TableHead>
                    <TableBody>
                        {variableExpensesLedgers.map((ledger, index) => (
                            <TableRow key={index}>
                                <StyledTableCell
                                    onFocus={event => onFocus(event, ledger)}
                                    onBlur={(event) => onBlur(event, ledger, index)}
                                >
                                    <InputBase
                                        sx={{
                                            input: {
                                                fontSize: "0.875rem",
                                                p: 0
                                            }
                                        }}
                                        inputProps={{
                                            min: 1,
                                            max: 31
                                        }}
                                        fullWidth
                                        size={"small"}
                                        type={"text"}
                                        value={ledger.day ?? ''}
                                        onChange={event => onDayChange(event, index)}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Select
                                        variant={'standard'}
                                        onChange={(event) => onCategoryChange(event, index)}
                                        value={ledger.categoryId}
                                        fullWidth
                                        input={<CustomInputBase/>}
                                    >
                                        <CustomMenuItem
                                            disabled
                                            value={0}
                                        >대분류 선택</CustomMenuItem>
                                        {expensesCategories.map(category => (
                                            <CustomMenuItem key={category.categoryId}
                                                      value={category.categoryId}>{category.name}</CustomMenuItem>)
                                        )}
                                    </Select>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Select
                                        variant={'standard'}
                                        size={"small"}
                                        onChange={(event) => onSubCategoryChange(event, ledger.categoryId, index)}
                                        value={ledger.subCategoryId}
                                        fullWidth
                                        input={<CustomInputBase/>}
                                    >
                                        <CustomMenuItem
                                            disabled
                                            value={0}
                                        >소분류 선택</CustomMenuItem>
                                        {expensesCategories.filter(category => category.categoryId === ledger.categoryId)
                                            .flatMap(category => category.subCategories)
                                            .map(subCategory =>
                                                (
                                                    <CustomMenuItem key={subCategory.subCategoryId}
                                                              value={subCategory.subCategoryId}>{subCategory.name}
                                                    </CustomMenuItem>
                                                )
                                            )}

                                    </Select>
                                </StyledTableCell>
                                <StyledTableCell
                                    onFocus={(event) => onFocus(event, ledger)}
                                    onBlur={(event) => onBlur(event, ledger, index)}
                                >
                                    <InputBase
                                        sx={{
                                            input: {
                                                fontSize: "0.875rem",
                                                p: 0
                                            }
                                        }}
                                        fullWidth
                                        size={"small"}
                                        type={"text"}
                                        value={ledger.memo}
                                        onChange={event => onMemoChange(event, index)}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>{'test'}</StyledTableCell>
                                <StyledTableCell
                                    onFocus={(event) => onFocus(event, ledger)}
                                    onBlur={(event) => onBlur(event, ledger, index)}
                                >
                                    <InputBase
                                        fullWidth
                                        sx={{
                                            input: {
                                                textAlign: "right",
                                                fontSize: "0.875rem",
                                                p: 0
                                            }
                                        }}
                                        size={"small"}
                                        type={"text"}
                                        value={Number(ledger.amount).toLocaleString()}
                                        onChange={event => onAmountChange(event, index)}
                                    />
                                </StyledTableCell>

                            </TableRow>
                        ))}

                        <TableRow>
                            <StyledTableCell colSpan={6} align={"center"}>
                                <Button onClick={() => addNewLedgerRow()}>추가</Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}