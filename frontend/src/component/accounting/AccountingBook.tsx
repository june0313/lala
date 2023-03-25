import {Grid, Paper, Stack, TextField} from "@mui/material";
import LedgerInput from "../input/LedgerInput";
import Report from "../report/Report";
import React, {useEffect, useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import moment, {Moment} from "moment";
import VariableExpensesInput from "../input/VariableExpensesInput";
import {CategorySummary, ReportApi} from "../../api/ReportApi";
import MonthlySummary from "../report/MonthlySummary";
import {useNavigate, useLocation} from "react-router-dom";
import qs from 'qs';

export default function AccountingBook() {
    const location = useLocation();
    const queryParams = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const [rows, setRows] = useState<CategorySummary[]>([]);

    useEffect(() => {
        fetchRows()
    }, [location])

    const navigate = useNavigate();

    function fetchRows() {
        ReportApi.findReport(getCurrentYear(), getCurrentMonth())
            .then(r => setRows(r))
    }

    function getCurrentYear(): number {
        return queryParams.year == undefined ? moment().year() : parseInt(queryParams.year as string);
    }

    function getCurrentMonth(): number {
        return queryParams.month == undefined ? moment().month() + 1 : parseInt(queryParams.month as string);
    }

    function getCurrentMoment(): Moment {
        return moment().year(getCurrentYear()).month(getCurrentMonth() - 1);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper sx={{
                    p: 1
                }}>
                    <DatePicker
                        views={['year', 'month']}
                        value={getCurrentMoment()}
                        openTo="month"
                        inputFormat={"yyyy-MM"}
                        onChange={(newValue) => {
                            if (newValue !== null) {
                                navigate(`/?year=${newValue.year()}&month=${newValue.month() + 1}`)
                            }
                        }}
                        renderInput={(params) => <TextField {...params} size={"small"}/>}
                    />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <LedgerInput title="수입"
                                 api="/api/v1/input/income"
                                 year={getCurrentYear()}
                                 month={getCurrentMonth()}
                                 onChange={() => fetchRows()}
                    />
                    <LedgerInput title="저축, 투자"
                                 api="/api/v1/input/saving-investment"
                                 year={getCurrentYear()}
                                 month={getCurrentMonth()}
                                 onChange={() => fetchRows()}
                    />
                    <LedgerInput title="연금, 노후"
                                 api="/api/v1/input/pension"
                                 year={getCurrentYear()}
                                 month={getCurrentMonth()}
                                 onChange={() => fetchRows()}
                    />
                    <LedgerInput title="고정 지출"
                                 api="/api/v1/input/expenses"
                                 year={getCurrentYear()}
                                 month={getCurrentMonth()}
                                 onChange={() => fetchRows()}
                    />
                    <VariableExpensesInput
                        title='변동 지출'
                        year={getCurrentYear()}
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
