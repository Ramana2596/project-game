// drawerStyles.js
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid rgba(123, 31, 162, 0.15)`,
    borderRight: `1px solid rgba(123, 31, 162, 0.15)`,
    padding: theme.spacing(0, 1),
    background: 'linear-gradient(180deg, #fafbfc 0%, #f6f5f8 100%)',
    // necessary for content to be below app bar
    minHeight: '64px',
    height: '64px',
    justifyContent: 'space-between',
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 2px 8px rgba(123, 31, 162, 0.1)',
    borderBottom: `1px solid rgba(123, 31, 162, 0.15)`,
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        borderRight: `1px solid rgba(123, 31, 162, 0.15) !important`,
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': {
                ...openedMixin(theme),
                background: 'linear-gradient(180deg, #fafbfc 0%, #f6f5f8 100%)',
                borderRight: `1px solid rgba(123, 31, 162, 0.15)`,
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': {
                ...closedMixin(theme),
                background: 'linear-gradient(180deg, #fafbfc 0%, #f6f5f8 100%)',
                borderRight: `1px solid rgba(123, 31, 162, 0.15)`,
            },
        }),
    }),
);

export { drawerWidth, DrawerHeader, AppBar, Drawer };
