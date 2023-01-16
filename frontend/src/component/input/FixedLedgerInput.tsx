import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {InputBase, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import axios from "axios";
import {Moment} from "moment";
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
    moment: Moment
}

export default function FixedLedgerInput(props: InputProps) {
    const [ledgerInputs, setLedgerInputs] = useState<LedgerInput[]>([])

    useEffect(() => {
        axios.get(props.api)
            .then(r => setLedgerInputs(r.data))
    }, [])

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
        setLedgerInputs(newIncomeInput);
    }

    function onFocus(event: React.FocusEvent<HTMLTableCellElement>) {
        event.target.style.backgroundColor = "#D0ECE7"
        event.currentTarget.style.backgroundColor = "#D0ECE7"
    }

    function onBlur(event: React.FocusEvent<HTMLTableCellElement>, input: LedgerInput, index: number) {
        event.target.style.backgroundColor = "white"
        event.currentTarget.style.backgroundColor = "white"

        axios.post("/api/v1/ledgers", {
            ledgerId: input.ledgerId,
            categoryId: input.categoryId,
            subCategoryId: input.subCategoryId,
            memo: input.memo,
            amount: input.amount,
            date: props.moment.format("yyyy-MM-DD")
        }).then(r => {
            const newLedgerInputs = [...ledgerInputs];
            newLedgerInputs[index].ledgerId = r.data.id;
            setLedgerInputs(newLedgerInputs);
        })
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
                                        onFocus={(event) => onFocus(event)}
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
                                                     onFocus={(event) => onFocus(event)}
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