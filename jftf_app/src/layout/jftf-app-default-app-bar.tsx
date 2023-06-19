import {AppBar, ToggleThemeButton, TitlePortal, Button} from 'react-admin';
import {createTheme} from '@mui/material';

export const darkTheme = createTheme({
    palette: {mode: 'dark'},
});

const lightTheme = createTheme({
    palette: {mode: 'light'},
});

export const JftfAppDefaultAppBar = (props) => {

    const handleConfigurationButtonClick = () => {
        window.open('http://localhost:8000/admin/constance/config/', '_blank');
    };


    return (
        <AppBar>
            <TitlePortal/>
            <Button color="inherit" onClick={handleConfigurationButtonClick} label={"JFTF-Lib Configuration"}></Button>
            <ToggleThemeButton lightTheme={lightTheme} darkTheme={darkTheme}/>
        </AppBar>
    );
};
