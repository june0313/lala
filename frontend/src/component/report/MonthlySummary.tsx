import {Card, CardContent, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

export default function MonthlySummary() {
    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                총 수입
                            </Typography>
                            <Typography variant={"h6"} textAlign={"right"} color={"success.main"}>
                                13,000,000
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                총 지출
                            </Typography>
                            <Typography variant={"h6"} textAlign={"right"} color={"error.main"}>
                                2,630,000
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}