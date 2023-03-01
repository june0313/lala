import {Grid, Paper, Stack, TextField} from "@mui/material";
import FixedLedgerInput from "../input/FixedLedgerInput";
import Report from "../report/Report";
import React, {useEffect, useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import moment, {Moment} from "moment";
import VariableExpensesInput from "../input/VariableExpensesInput";
import {CategorySummary, ReportApi} from "../../api/ReportApi";
import MonthlySummary from "../report/MonthlySummary";

export default function Main() {
    const [currentMoment, setCurrentMoment] = React.useState<Moment>(moment());
    const [rows, setRows] = useState<CategorySummary[]>([]);

    useEffect(() => {
        fetchRows()
    }, [currentMoment])

    function fetchRows() {
        ReportApi.findReport(getCurrentYear(), getCurrentMonth())
            .then(r => setRows(r))
    }

    function getCurrentYear(): number {
        return currentMoment.year();
    }

    function getCurrentMonth(): number {
        return currentMoment.month() + 1;
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper sx={{
                    p: 1
                }}>
                    <DatePicker
                        views={['year', 'month']}
                        value={currentMoment}
                        openTo="month"
                        inputFormat={"yyyy-MM"}
                        onChange={(newValue) => {
                            if (newValue !== null) {
                                setCurrentMoment(newValue);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} size={"small"}/>}
                    />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <FixedLedgerInput title="수입"
                                      api="/api/v1/input/income"
                                      year={getCurrentYear()}
                                      month={getCurrentMonth()}
                                      onChange={() => fetchRows()}
                    />
                    <FixedLedgerInput title="저축, 투자"
                                      api="/api/v1/input/saving-investment"
                                      year={getCurrentYear()}
                                      month={getCurrentMonth()}
                                      onChange={() => fetchRows()}
                    />
                    <FixedLedgerInput title="연금, 노후"
                                      api="/api/v1/input/pension"
                                      year={getCurrentYear()}
                                      month={getCurrentMonth()}
                                      onChange={() => fetchRows()}
                    />
                    <FixedLedgerInput title="고정 지출"
                                      api="/api/v1/input/expenses"
                                      year={getCurrentYear()}
                                      month={getCurrentMonth()}
                                      onChange={() => fetchRows()}
                    />
                    <VariableExpensesInput year={getCurrentYear()}
                                           month={getCurrentMonth()}/>
                </Stack>
            </Grid>

            <Grid item xs={6}>
                <Stack spacing={1}>
                    <MonthlySummary/>
                    <Report rows={rows}/>
                </Stack>
            </Grid>
        </Grid>
    )
}
