import {Grid, Paper, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Income from "../income/Income";
import Report from "../report/Report";
import React from "react";
import {DatePicker} from "@mui/x-date-pickers";
import moment, {Moment} from "moment";

function Main() {
    const [currentMoment, setCurrentMoment] = React.useState<Moment | null>(moment());

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
                                onChange={(newValue) => {
                                    setCurrentMoment(newValue);
                                }}
                                inputFormat={"yyyy-MM"}
                                renderInput={(params) => <TextField {...params} size={"small"}/>}
                            />
                        </Paper>
                        <Income/>
                    </Stack>
                </Grid>

                <Grid item xs={6}>
                    <Report/>
                </Grid>
            </Grid>
        </Box>

    )
}

export default Main;