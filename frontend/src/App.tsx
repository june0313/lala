import React from 'react';
import './App.css';
import NavigationBar from "./component/navigation/NavigationBar";
import Box from "@mui/material/Box";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AccountingBook from "./component/accounting/AccountingBook";
import CategoryManagement from "./component/category/CategoryManagement";
import CssBaseline from "@mui/material/CssBaseline";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from "@mui/x-date-pickers";
import 'moment/locale/ko'
import SideMenu from "./component/navigation/SideMenu";
import {Toolbar} from "@mui/material";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"ko"}>
            <CssBaseline/>
            <BrowserRouter>
                <Box sx={{display: 'flex'}} height={'100%'}>
                    <NavigationBar/>
                    <SideMenu/>
                    <Box bgcolor={'whitesmoke'} sx={{
                        flexGrow:1, p: 1
                    }}>
                        <Toolbar />
                        <Routes>
                            <Route path={"/"} element={<AccountingBook/>}></Route>
                            <Route path={"/category"} element={<CategoryManagement/>}></Route>
                        </Routes>
                    </Box>
                </Box>
            </BrowserRouter>
        </LocalizationProvider>
    );
}

export default App;
