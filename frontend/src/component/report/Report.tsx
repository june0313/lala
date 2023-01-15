import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import axios from "axios";

type Ledger = {
    id: number,
    amount: number,
    memo: string,
    ledgerType: string,
    categoryName: string,
    subCategoryName: string,
    date: string
}

interface ReportProps {
    year: number;
    month: number;
}

export default function Report(props: ReportProps) {
    const [rows, setRows] = useState<Ledger[]>([]);

    useEffect(() => {
        axios.get("/api/v1/ledgers", {
            params: {
                year: props.year,
                month: props.month
            }
        })
            .then(r => setRows(r.data))
    }, [props])

    return (
        <Box>
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
                        {rows.map(row => (
                            <TableRow key = {row.id}>
                                <TableCell>{row.categoryName}</TableCell>
                                <TableCell>{row.subCategoryName}</TableCell>
                                <TableCell>{row.memo}</TableCell>
                                <TableCell>{row.amount.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
        </Box>
    );
}