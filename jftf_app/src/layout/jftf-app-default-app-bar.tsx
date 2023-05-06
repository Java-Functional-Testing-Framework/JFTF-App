import { AppBar, ToggleThemeButton, TitlePortal } from 'react-admin';
import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
    palette: { mode: 'dark' },
});

const lightTheme = createTheme({
    palette: { mode: 'light' },
});

export const JftfAppDefaultAppBar = (props) => (
    <AppBar>
        <TitlePortal />
        <ToggleThemeButton lightTheme={lightTheme} darkTheme={darkTheme} />
    </AppBar>
);
