import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, Stack} from "@mui/material";

export default function LalaAppBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar variant={"dense"}>
                    <Typography variant="h6" component="a" href={"/"} sx={{
                        mr: 5,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                        라라 가계부
                    </Typography>

                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" color={"inherit"} href={"/"}>월별 결산</Button>
                        <Button variant="outlined" color={"inherit"} href={"/category"}>항목 관리</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}