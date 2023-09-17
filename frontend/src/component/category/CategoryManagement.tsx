import React, {useEffect, useState} from "react";
import {Category, CategoryApi, SubCategory} from "../../api/CategoryApi";
import {
    Alert,
    Box,
    Button,
    IconButton,
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
import {AddCircle, PushPin, RemoveCircle} from "@mui/icons-material";

function CategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([])
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryNameError, setNewCategoryNameError] = useState(false);

    const [newSubCategoryName, setNewSubCategoryName] = useState(new Map());

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const tabData = [
        {
            tabName: "수입",
            categoryType: "INCOME"
        },
        {
            tabName: "저축",
            categoryType: "SAVING"
        },
        {
            tabName: "투자",
            categoryType: "INVESTMENT"
        },
        {
            tabName: "지출",
            categoryType: "EXPENSES"
        }
    ];

    useEffect(() => {
        CategoryApi.getAllCategories()
            .then(categories => setCategories(categories))
    }, [])

    function addCategory(name: string, categoryType: string) {
        if (name.length === 0) {
            setNewCategoryNameError(newCategoryName.length === 0)
            return;
        }

        CategoryApi.addCategory(name, categoryType)
            .then(() => CategoryApi.getAllCategories())
            .then(categories => setCategories(categories))
            .catch(error => {
                setSnackBarMessage(error.response.data.detail)
                setSnackBarOpen(true);
            })
            .finally(() => setNewCategoryName(''))
    }

    function addSubCategory(categoryId: number) {
        const subCategoryName = newSubCategoryName.get(categoryId) || '';

        if (subCategoryName.length === 0) {
            console.log("sub category name is empty.")
            return;
        }

        CategoryApi.addSubCategory(categoryId, subCategoryName)
            .then(() => CategoryApi.getAllCategories())
            .then(categories => setCategories(categories))
            .then(() => setNewSubCategoryName(prev => new Map(prev).set(categoryId, '')))
            .catch(error => {
                setSnackBarMessage(error.response.data.detail)
                setSnackBarOpen(true);
            })
    }

    function updateSubCategory(subCategory: SubCategory) {
        CategoryApi.updateSubCategory(subCategory.subCategoryId, !subCategory.fixed)
            .then(() => CategoryApi.getAllCategories())
            .then(categories => setCategories(categories))
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

    function onChangeNewSubCategoryName(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, categoryId: number) {
        e.preventDefault();
        setNewSubCategoryName(prev => new Map(prev).set(categoryId, e.target.value));
    }

    return (
        <div>
            <Tabs value={currentTabIndex} onChange={onChangeTab} textColor="secondary" indicatorColor="secondary">
                {tabData.map((t, i) => <Tab key={i} label={t.tabName}></Tab>)}
            </Tabs>

            <Box
                sx={{
                    mt: 1
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
                            onClick={() => addCategory(newCategoryName, tabData[currentTabIndex].categoryType)}
                    >
                        추가
                    </Button>
                </Stack>

                <Box sx={{
                    display: "flex"
                }}>

                    <Stack direction={"row"} spacing={1} sx={{
                        mb: 1
                    }}>
                        {categories
                            .filter(category => category.categoryType === tabData[currentTabIndex].categoryType)
                            .map(category => (
                                    <Box
                                        key={category.categoryId}
                                        sx={{
                                        flexGrow: 0
                                    }}>
                                        <TableContainer component={Paper} elevation={1}>
                                            <Table size={"small"}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2} component="th" align={"center"}>
                                                            {category.name}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {category.subCategories.map(subCategory => (
                                                        <TableRow key={subCategory.subCategoryId}>
                                                            <TableCell>
                                                                {subCategory.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Stack direction={"row"}>
                                                                    <IconButton size={"small"}
                                                                                color={subCategory.fixed ? "success" : undefined}
                                                                                onClick={() => updateSubCategory(subCategory)}
                                                                    >
                                                                        <PushPin/>
                                                                    </IconButton>

                                                                    <IconButton color="error"
                                                                                size={"small"}>
                                                                        <RemoveCircle/>
                                                                    </IconButton>
                                                                </Stack>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}

                                                    <TableRow>
                                                        <TableCell>
                                                            <Input placeholder={'새 소분류...'}
                                                                   size={"small"}
                                                                   value={newSubCategoryName.get(category.categoryId) || ''}
                                                                   onChange={(e => onChangeNewSubCategoryName(e, category.categoryId))}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button size={"small"}
                                                                    startIcon={<AddCircle/>}
                                                                    variant={"contained"}
                                                                    color={"primary"}
                                                                    onClick={() => addSubCategory(category.categoryId)}
                                                            >
                                                                추가
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                )
                            )
                        }
                    </Stack>
                </Box>
            </Box>

            <Snackbar
                open={snackBarOpen}
                autoHideDuration={3000}
                onClose={() => {
                    setSnackBarOpen(false);
                    setSnackBarMessage('');
                }}
            >
                <Alert severity="error" sx={{width: '100%'}} variant={"filled"}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CategoryManagement;