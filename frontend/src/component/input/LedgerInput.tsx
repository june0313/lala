import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {
    Button,
    InputBase, Modal,
    Paper, Stack,
    Table,
    TableBody, TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import {StyledTableCell, StyledTableHeader, StyledTableHeaderRow} from '../custom/Tables';
import {Ledger, LedgerApi} from "../../api/LedgerApi";

interface FixedLedgerInputProps {
    title: string;
    api: string;
    year: number;
    month: number;
    onChange: () => void
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function LedgerInput(props: FixedLedgerInputProps) {
    const [ledgers, setLedgers] = useState<Ledger[]>([])
    const [cache, setCache] = useState('');
    const [modalOpen, setModelOpen] = useState(false);

    useEffect(() => {
        axios
            .get(props.api, {
                params: {
                    year: props.year,
                    month: props.month
                }
            })
            .then(r => setLedgers(r.data))
    }, [props])

    function onAmountChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newLedgers = [...ledgers];
        newLedgers[index].amount = Number(event.target.value.replace(/\D/g, ''));
        setLedgers(newLedgers);
    }

    function onMemoChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        event.preventDefault();

        const newLedgers = [...ledgers];
        newLedgers[index].memo = event.target.value;
        setLedgers(newLedgers)
    }

    function onFocus(event: React.FocusEvent<HTMLTableCellElement>, ledger: Ledger) {
        event.target.style.backgroundColor = "#D0ECE7"
        event.currentTarget.style.backgroundColor = "#D0ECE7"

        setCache(JSON.stringify(ledger))
    }

    function openModal() {
        setModelOpen(true);
    }

    function closeModal() {
        setModelOpen(false);
    }

    function onBlur(event: React.FocusEvent<HTMLTableCellElement>, ledger: Ledger, index: number) {
        event.target.style.backgroundColor = "white"
        event.currentTarget.style.backgroundColor = "white"

        if (cache != JSON.stringify(ledger)) {
            LedgerApi.updateLedger({
                id: ledger.id,
                amount: ledger.amount,
                memo: ledger.memo,
                categoryId: ledger.categoryId,
                subCategoryId: ledger.subCategoryId,
                year: ledger.year,
                month: ledger.month,
                day: ledger.day
            })
                .then(r => {
                    const newLedgers = [...ledgers];
                    newLedgers[index].id = r.id;
                    setLedgers(newLedgers);
                })
                .then(() => props.onChange())
        }

        setCache('')
    }

    return (

        <Box>
            <Modal open={modalOpen} onClose={closeModal}>
                <Box sx={style}>
                    Test test test
                </Box>
            </Modal>
            <Stack direction="column" spacing={1}>

                <Typography variant="h6" mt={1} ml={1}>
                    {props.title}
                </Typography>

                <Box textAlign="right">
                    <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={openModal}>추가</Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <StyledTableHeaderRow>
                                <StyledTableHeader>대분류</StyledTableHeader>
                                <StyledTableHeader>소분류</StyledTableHeader>
                                <StyledTableHeader>메모</StyledTableHeader>
                                <StyledTableHeader>금액</StyledTableHeader>
                            </StyledTableHeaderRow>
                        </TableHead>
                        <TableBody>
                            {ledgers.map((ledger, index) => {
                                return (
                                    <TableRow key={index}>
                                        <StyledTableCell width={"20%"}>
                                            {ledger.categoryName}
                                        </StyledTableCell>
                                        <StyledTableCell width={"20%"}>
                                            {ledger.subCategoryName}
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
                                                type={"text"}
                                                value={ledger.memo}
                                                onChange={(event) => onMemoChange(event, index)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell width={"15%"}
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
                                                type={"text"}
                                                value={Number(ledger.amount).toLocaleString()}
                                                onChange={event => onAmountChange(event, index)}
                                            />
                                        </StyledTableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Box>
    );
}