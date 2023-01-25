import {styled} from "@mui/material/styles";
import {InputBase, MenuItem, TableCell, TableRow} from "@mui/material";

export const StyledTableHeaderRow = styled(TableRow)(({theme}) => ({
    border: '1px solid',
    borderColor: theme.palette.grey["600"],
    backgroundColor: theme.palette.grey["600"],
}));

export const StyledTableHeader = styled(TableCell)(({theme}) => ({
    fontWeight: 'bold',
    color: theme.palette.common.white,
    padding: "6px"
}));

export const StyledTableCell = styled(TableCell)(({theme}) => ({
    border: "1px solid",
    borderColor: theme.palette.grey["300"],
    padding: "6px"
}));

export const CustomInputBase = styled(InputBase)(({theme}) => ({
    fontSize: "0.875rem"
}));

export const CustomMenuItem = styled(MenuItem)(({theme}) => ({
    fontSize: "0.875rem"
}));