import React from 'react';
import './App.css';
import LalaAppBar from "./component/AppBar";
import Box from "@mui/material/Box";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./component/main/Main";
import CategoryManagement from "./component/category/CategoryManagement";
import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import PaidIcon from '@mui/icons-material/Paid';
import CategoryIcon from '@mui/icons-material/Category';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from "@mui/x-date-pickers";
import 'moment/locale/ko'

const drawerWidth = 240;

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"ko"}>
            <Box sx={{display: 'flex', height: "100%", overflow: "auto"}}>
                <CssBaseline/>
                <LalaAppBar/>
                <Drawer open
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="permanent"
                        anchor="left"
                >
                    <Toolbar variant={"dense"}/>
                    <Divider/>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton href={"/"}>
                                <ListItemIcon>
                                    <PaidIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"월별 통계"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton href={"/category"}>
                                <ListItemIcon>
                                    <CategoryIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"항목 관리"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>


                <Box
                    component="main"
                    sx={{flexGrow: 1, backgroundColor: 'whitesmoke', p: 1, height: '100%', overflow: "auto"}}
                >
                    <Toolbar variant={"dense"}/>
                    <BrowserRouter>
                        <Routes>
                            <Route path={"/"} element={<Main/>}></Route>
                            <Route path={"/category"} element={<CategoryManagement/>}></Route>
                        </Routes>
                    </BrowserRouter>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}

export default App;
