import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Alert,
    Box,
    Button,
    Chip,
    Input,
    Paper,
    Snackbar,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs
} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

interface Category {
    categoryId: number,
    group: string,
    name: string
    subCategories: SubCategory[]
}

interface SubCategory {
    subCategoryId: number,
    name: string
}

function CategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([])
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryNameError, setNewCategoryNameError] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const tabData = [
        {
            tabName: "수입",
            categoryGroup: "INCOME"
        },
        {
            tabName: "저축, 투자",
            categoryGroup: "SAVING_INVESTMENT"
        },
        {
            tabName: "연금, 노후",
            categoryGroup: "PENSION"
        },
        {
            tabName: "지출",
            categoryGroup: "EXPENSES"
        },
    ];

    useEffect(() => {
        axios.get("/api/v1/categories")
            .then(r => setCategories(r.data))
    }, [])

    function addCategory(name: string, group: string) {
        if (name.length === 0) {
            setNewCategoryNameError(newCategoryName.length === 0)
            return;
        }

        axios.post("/api/v1/categories", {
            name: name,
            categoryGroup: group
        })
            .then(() => axios.get("/api/v1/categories"))
            .then(response => setCategories(response.data))
            .catch(error => {
                console.log(error.response.data);
                setSnackBarMessage(error.response.data.detail)
                setSnackBarOpen(true);
            })
            .finally(() => setNewCategoryName(''))

    }

    function addSubCategory(categoryId: number) {
        console.log("add sub category to " + categoryId)
    }

    const onChangeTab = (event: React.SyntheticEvent, tabIndex: number) => {
        setCurrentTabIndex(tabIndex);
        setNewCategoryName('');
        setNewCategoryNameError(false);
    };

    const onChangeNewCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewCategoryName(e.target.value);
        setNewCategoryNameError(false);
    }

    return (
        <div>
            <Tabs value={currentTabIndex} onChange={onChangeTab} textColor="secondary" indicatorColor="secondary">
                {tabData.map((t, i) => <Tab key={i} label={t.tabName}></Tab>)}
            </Tabs>

            <Box
                sx={{
                    p: 1,
                    backgroundColor: 'WhiteSmoke',
                }}
            >
                <Stack direction={"row"} spacing={1} sx={{
                    mb: 1,
                    ml: 1
                }}>
                    <Input placeholder={`새 대분류`}
                               size={"small"}
                               type={"text"}
                               value={newCategoryName}
                               onChange={onChangeNewCategoryName}
                               error={newCategoryNameError}
                    />
                    <Button size={"small"}
                            startIcon={<AddCircle/>}
                            variant={"contained"}
                            onClick={() => addCategory(newCategoryName, tabData[currentTabIndex].categoryGroup)}
                    >
                        추가
                    </Button>
                </Stack>

                <TableContainer component={Paper} elevation={1}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell component="th">대분류</TableCell>
                                <TableCell component="th">소분류</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {categories
                                .filter(category => category.group === tabData[currentTabIndex].categoryGroup)
                                .map(category =>
                                    (
                                        <TableRow key={category.categoryId}>
                                            <TableCell>
                                                {category.name}
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction={"row"} spacing={1}>
                                                    {category.subCategories.map(subCategory =>
                                                        (
                                                            <Chip key={subCategory.subCategoryId}
                                                                  label={subCategory.name}
                                                                  onClick={() => console.log("on click chip")}
                                                                  onDelete={() => console.log("on delete chip")}
                                                            />
                                                        )
                                                    )}

                                                    <Input placeholder={`새 ${category.name} 소분류`} size={"small"}/>
                                                    <Button size={"small"} startIcon={<AddCircle/>}
                                                            variant={"contained"}
                                                            onClick={() => addSubCategory(category.categoryId)}>
                                                        추가
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Snackbar
                open={snackBarOpen}
                autoHideDuration={3000}
                onClose={() => {
                    setSnackBarOpen(false);
                    setSnackBarMessage('');
                }}
            >
                <Alert  severity="error" sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CategoryManagement;