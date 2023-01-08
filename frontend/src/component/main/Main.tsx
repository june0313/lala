import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Income from "../income/Income";
import Report from "../report/Report";
import React from "react";

function Main() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box sx={{
                    p: 2
                }}>
                    <Income></Income>
                </Box>
            </Grid>

            <Grid item xs={6}>
                <Box sx={{
                    p: 2
                }}>
                    <Report></Report>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Main;