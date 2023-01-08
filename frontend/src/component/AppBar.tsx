import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

export default function LalaAppBar() {
    return (
        <Box >
            <AppBar position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
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
                </Toolbar>
            </AppBar>
        </Box>
    );
}