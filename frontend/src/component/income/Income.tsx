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
import axios from "axios";

interface IncomeInput {
    ledgerId?: number;
    categoryId: number;
    categoryName: string;
    subCategoryId: number;
    subCategoryName: string;
    memo: string;
    amount: number;
}

const tableCellBorderStyle = {
    border: "1px solid rgba(224, 224, 224, 1)"
}

export default function Income() {
    const [incomeInput, setIncomeInput] = useState<IncomeInput[]>([])

    useEffect(() => {
        axios.get("/api/v1/input/income")
            .then(r => setIncomeInput(r.data))
    }, [])

    function onAmountChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newIncomeInput = [...incomeInput];
        newIncomeInput[index].amount = Number(event.target.value.replace(/\D/g, ''));
        setIncomeInput(newIncomeInput);
    }

    function onMemoChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newIncomeInput = [...incomeInput];
        newIncomeInput[index].memo = event.target.value;
        setIncomeInput(newIncomeInput);
    }

    return (
        <Box>
            <Typography variant="h6" mt={1}>
                수입
            </Typography>

            <TableContainer component={Paper}>
                <Table size={'small'}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={tableCellBorderStyle}>대분류
                            </TableCell>
                            <TableCell
                                sx={tableCellBorderStyle}>소분류
                            </TableCell>
                            <TableCell
                                sx={tableCellBorderStyle}>메모
                            </TableCell>
                            <TableCell
                                sx={tableCellBorderStyle}>금액
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incomeInput.map((input, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell width={"20%"}
                                               sx={tableCellBorderStyle}>
                                        {input.categoryName}
                                    </TableCell>
                                    <TableCell
                                        width={"20%"}
                                        sx={tableCellBorderStyle}
                                    >
                                        {input.subCategoryName}
                                    </TableCell>
                                    <TableCell
                                        sx={tableCellBorderStyle}
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
                                    </TableCell>
                                    <TableCell width={"20%"}
                                               sx={tableCellBorderStyle}>
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
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}