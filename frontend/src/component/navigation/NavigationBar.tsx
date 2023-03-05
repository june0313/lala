import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function NavigationBar() {
    return (
        <AppBar position="fixed" sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1
        }}>
            <Toolbar >
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
    );
}