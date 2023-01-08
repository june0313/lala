import * as React from 'react';
import {useEffect} from 'react';
import Box from "@mui/material/Box";
import {
    FormControl,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import axios from "axios";

export default function Income() {
    useEffect(() => {
        axios.get("/api/v1/categories/income")
            .then(r => console.log(r.data))
    }, [])

    return (
        <Box>수입<br/>
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
                        <TableRow>
                            <TableCell>
                                <FormControl fullWidth size="small">
                                    <Select
                                        id="category-select"

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>b</TableCell>
                            <TableCell>c</TableCell>
                            <TableCell>d</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </TableContainer>
        </Box>
    );
}