
import Box from '@mui/material/Box';
import GameMaster from './GameMaster';
import GameBatch from './GameBatch';
import { Divider, Drawer, List, ListItemButton, ListItem, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";
import GameSession from './GameSession';
import GameDashboard from './GameDashboard';


export default function TemporaryDrawer({ openState, toggleDrawer }) {

  const formList = [
    { displayText: 'Game Dashboard', routePath: '/', routeElement: <GameDashboard/> },  
  { displayText: 'Game Master', routePath: '/gameMaster', routeElement: <GameMaster/> },
  { displayText: 'Game Batch', routePath: '/gameBatch', routeElement: <GameBatch/> },
  { displayText: 'Game Session', routePath: '/gameSession', routeElement: <GameSession/> }
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
          {formList.map((formListObj) => (
              <ListItem sx={{color: 'black'}} disablePadding component={Link} to={formListObj.routePath}>
                <ListItemButton>
                  <ListItemText primary={formListObj.displayText} />
                </ListItemButton>
                <Divider />
              </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={openState} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
