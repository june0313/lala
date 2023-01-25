import * as React from 'react';
import {useEffect} from 'react';
import Box from "@mui/material/Box";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Ledger} from "../../api/LedgerApi";

interface ReportProps {
    rows: Ledger[]
}

export default function Report(props: ReportProps) {
    useEffect(() => {
    }, [props])

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table size={'small'}>
                    <TableHead>
                        <TableRow>
                            <TableCell>대분류</TableCell>
                            <TableCell>소분류</TableCell>
                            <TableCell>금액</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>{row.categoryName}</TableCell>
                                <TableCell>{row.subCategoryName}</TableCell>
                                <TableCell>{row.amount.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
        </Box>
    );
}