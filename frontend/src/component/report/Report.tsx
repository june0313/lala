import * as React from 'react';
import {useEffect} from 'react';
import Box from "@mui/material/Box";
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {CategorySummary} from "../../api/ReportApi";
import {StyledTableCell} from "../custom/Tables";

interface ReportProps {
    rows: CategorySummary[]
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
                            <StyledTableCell>대분류</StyledTableCell>
                            <StyledTableCell>소분류</StyledTableCell>
                            <StyledTableCell>항목별 금액</StyledTableCell>
                            <StyledTableCell>총 금액</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map(row =>
                            row.subCategorySummaries.map((subRow, index) => (
                                <TableRow key={index}>
                                    {index === 0 ? <StyledTableCell
                                        rowSpan={row.subCategorySummaries.length}>{row.categoryName}</StyledTableCell> : null}
                                    <StyledTableCell>{subRow.subCategoryName}</StyledTableCell>
                                    <StyledTableCell>{subRow.amount.toLocaleString()}</StyledTableCell>
                                    {index === 0 ? <StyledTableCell
                                        rowSpan={row.subCategorySummaries.length}>{row.totalAmount.toLocaleString()}</StyledTableCell> : null}
                                </TableRow>
                            )))}
                    </TableBody>
                </Table>

            </TableContainer>
        </Box>
    );
}