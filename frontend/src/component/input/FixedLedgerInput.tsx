import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {InputBase, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import axios from "axios";
import {StyledTableCell, StyledTableHeader, StyledTableHeaderRow} from '../custom/Tables';

interface LedgerInput {
    ledgerId?: number;
    categoryId: number;
    categoryName: string;
    subCategoryId: number;
    subCategoryName: string;
    memo: string;
    amount: number;
}

interface InputProps {
    title: string;
    api: string;
    year: number;
    month: number;
    onChange: () => void
}

export default function FixedLedgerInput(props: InputProps) {
    const [ledgerInputs, setLedgerInputs] = useState<LedgerInput[]>([])
    const [cache, setCache] = useState('');

    useEffect(() => {
        axios
            .get(props.api, {
                params: {
                    year: props.year,
                    month: props.month
                }
            })
            .then(r => setLedgerInputs(r.data))
    }, [props])

    function onAmountChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newIncomeInput = [...ledgerInputs];
        newIncomeInput[index].amount = Number(event.target.value.replace(/\D/g, ''));
        setLedgerInputs(newIncomeInput);
    }

    function onMemoChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newIncomeInput = [...ledgerInputs];
        newIncomeInput[index].memo = event.target.value;
        setLedgerInputs(newIncomeInput)
    }

    function onFocus(event: React.FocusEvent<HTMLTableCellElement>, input: LedgerInput) {
        event.target.style.backgroundColor = "#D0ECE7"
        event.currentTarget.style.backgroundColor = "#D0ECE7"

        setCache(JSON.stringify(input))
    }

    function onBlur(event: React.FocusEvent<HTMLTableCellElement>, input: LedgerInput, index: number) {
        event.target.style.backgroundColor = "white"
        event.currentTarget.style.backgroundColor = "white"

        if (cache != JSON.stringify(input)) {
            axios
                .post("/api/v1/ledgers", {
                    ledgerId: input.ledgerId,
                    categoryId: input.categoryId,
                    subCategoryId: input.subCategoryId,
                    memo: input.memo,
                    amount: input.amount,
                    year: props.year,
                    month: props.month,
                })
                .then(r => {
                    const newLedgerInputs = [...ledgerInputs];
                    newLedgerInputs[index].ledgerId = r.data.id;
                    setLedgerInputs(newLedgerInputs);
                })
                .then(() => props.onChange())
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
                            <StyledTableHeader>대분류</StyledTableHeader>
                            <StyledTableHeader>소분류</StyledTableHeader>
                            <StyledTableHeader>메모</StyledTableHeader>
                            <StyledTableHeader>금액</StyledTableHeader>
                        </StyledTableHeaderRow>
                    </TableHead>
                    <TableBody>
                        {ledgerInputs.map((input, index) => {
                            return (
                                <TableRow key={index}>
                                    <StyledTableCell width={"20%"}>
                                        {input.categoryName}
                                    </StyledTableCell>
                                    <StyledTableCell width={"20%"}>
                                        {input.subCategoryName}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        onFocus={(event) => onFocus(event, input)}
                                        onBlur={(event) => onBlur(event, input, index)}
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
                                            value={input.memo}
                                            onChange={(event) => onMemoChange(event, index)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell width={"15%"}
                                                     onFocus={(event) => onFocus(event, input)}
                                                     onBlur={(event) => onBlur(event, input, index)}
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
                                            value={Number(input.amount).toLocaleString()}
                                            onChange={event => onAmountChange(event, index)}
                                        />
                                    </StyledTableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}