import React from 'react';
import './App.css';
import LalaAppBar from "./component/AppBar";
import Box from "@mui/material/Box";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./component/main/Main";
import CategoryManagement from "./component/category/CategoryManagement";

function App() {
    return (
        <div>
            <Box>
                <BrowserRouter>
                    <LalaAppBar/>
                    <Routes>
                        <Route path={"/"} element={<Main />}></Route>
                        <Route path={"/category"} element={<CategoryManagement />}></Route>
                    </Routes>
                </BrowserRouter>
            </Box>
        </div>
    );
}

export default App;
