import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
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

export default function Income() {
    const [incomeInput, setIncomeInput] = useState<IncomeInput[]>([])

    useEffect(() => {
        axios.get("/api/v1/input/income")
            .then(r => setIncomeInput(r.data))
    }, [])

    function onAmountChange(event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newIncomeInput = [...incomeInput];
        newIncomeInput[index].amount = Number(event.target.value.replace(/\D/g,''));
        setIncomeInput(newIncomeInput);
    }

    function onMemoChange(event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, index: number) {
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
                            <TableCell>대분류</TableCell>
                            <TableCell>소분류</TableCell>
                            <TableCell>메모</TableCell>
                            <TableCell>금액</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {incomeInput.map((input, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        {input.categoryName}
                                    </TableCell>
                                    <TableCell>
                                        {input.subCategoryName}
                                    </TableCell>
                                    <TableCell>
                                        <TextField size={"small"} type={"text"} value={input.memo} onChange={(event) => onMemoChange(event, index)}></TextField>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            sx={{input: {textAlign: "right"} }}
                                            size={"small"} type={"text"} value={Number(input.amount).toLocaleString()} onChange={(event) => onAmountChange(event, index)}>
                                        </TextField>
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