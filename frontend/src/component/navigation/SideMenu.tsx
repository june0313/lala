import React from 'react';
import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import Box from "@mui/material/Box";
import {SvgIconComponent} from "@mui/icons-material";
import EventNoteIcon from '@mui/icons-material/EventNote';
import CategoryIcon from '@mui/icons-material/Category';
import {Link} from "react-router-dom";

const DRAWER_WIDTH = 240;

type MenuItem = {
    displayName: string
    path: string
    icon: SvgIconComponent
}

const menuItems: MenuItem[] = [
    {
        displayName: "월별 가계부",
        path: "/",
        icon: EventNoteIcon
    },
    {
        displayName: "예산 관리",
        path: "/",
        icon: EventNoteIcon
    },
    {
        displayName: "카테고리 관리",
        path: "/category",
        icon: CategoryIcon
    }
]

export default function SideMenu() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: DRAWER_WIDTH, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <List>
                    {menuItems.map((menuItem, index) => (
                        <ListItem key={index} disablePadding component={Link} to={menuItem.path}
                                  style={{textDecoration: 'none', color: 'unset'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <menuItem.icon />
                                </ListItemIcon>
                                <ListItemText primary={menuItem.displayName}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}