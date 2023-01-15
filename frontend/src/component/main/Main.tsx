import {Grid, Paper, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import FixedLedgerInput from "../input/FixedLedgerInput";
import Report from "../report/Report";
import React from "react";
import {DatePicker} from "@mui/x-date-pickers";
import moment, {Moment} from "moment";

export default function Main() {
    const [currentMoment, setCurrentMoment] = React.useState<Moment>(moment());

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={6}>

                    <Stack spacing={1}>
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
                        <FixedLedgerInput title="수입" api="/api/v1/input/income" moment={currentMoment}/>
                        <FixedLedgerInput title="저축, 투자" api="/api/v1/input/saving-investment" moment={currentMoment}/>
                        <FixedLedgerInput title="연금, 노후" api="/api/v1/input/pension" moment={currentMoment}/>
                        <FixedLedgerInput title="고정 지출" api="/api/v1/input/fixed-expenses" moment={currentMoment}/>
                    </Stack>
                </Grid>

                <Grid item xs={6}>
                    <Report year={currentMoment.year()} month={currentMoment.month() + 1} />
                </Grid>
            </Grid>
        </Box>
    )
}
