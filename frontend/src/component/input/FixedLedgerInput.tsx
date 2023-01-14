import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {
    InputBase,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {styled} from '@mui/material/styles';
import axios from "axios";

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
}

const StyledTableHeaderRow = styled(TableRow)(({theme}) => ({
    border: '1px solid',
    borderColor: theme.palette.grey["600"],
    backgroundColor: theme.palette.grey["600"],
}));

const StyledTableHeader = styled(TableCell)(({theme}) => ({
    fontWeight: 'bold',
    color: theme.palette.common.white,
}));

const StyledTableCell = styled(TableCell)(({theme}) => ({
    border: "1px solid",
    borderColor: theme.palette.grey["300"]
}));

export default function FixedLedgerInput(props: InputProps) {
    const [ledgerInput, setLedgerInput] = useState<LedgerInput[]>([])

    useEffect(() => {
        axios.get(props.api)
            .then(r => setLedgerInput(r.data))
    }, [])

    function onAmountChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newIncomeInput = [...ledgerInput];
        newIncomeInput[index].amount = Number(event.target.value.replace(/\D/g, ''));
        setLedgerInput(newIncomeInput);
    }

    function onMemoChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newIncomeInput = [...ledgerInput];
        newIncomeInput[index].memo = event.target.value;
        setLedgerInput(newIncomeInput);
    }

    function onFocus(event: React.FocusEvent<HTMLTableCellElement>) {
        event.target.style.backgroundColor = "#D0ECE7"
        event.currentTarget.style.backgroundColor = "#D0ECE7"
    }

    function onBlur(event: React.FocusEvent<HTMLTableCellElement>, input: LedgerInput) {
        event.target.style.backgroundColor = "white"
        event.currentTarget.style.backgroundColor = "white"

        if (input.ledgerId === null) {
            console.log("TODO : create a new ledger...")
        } else {
            axios.put("/api/v1/ledgers", {
                ledgerId: input.ledgerId,
                memo: input.memo
            }).then(r => console.log("updated" + r.data))
        }
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
                        {ledgerInput.map((input, index) => {
                            return (
                                <TableRow key={index}>
                                    <StyledTableCell width={"20%"}>
                                        {input.categoryName}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        width={"20%"}

                                    >
                                        {input.subCategoryName}
                                    </StyledTableCell>
                                    <StyledTableCell

                                        onFocus={(event) => onFocus(event)}
                                        onBlur={(event) => onBlur(event, input)}
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
                                               onBlur={(event) => onBlur(event, input)}
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