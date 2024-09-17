
import Box from '@mui/material/Box';
import GameMaster from './GameMaster';
import GameBatch from './GameBatch';
import { Divider, Drawer, List, ListItemButton, ListItem, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";


export default function TemporaryDrawer({ openState, toggleDrawer }) {

  const formList = [{ displayText: 'Game Master', routePath: '/', routeElement: <GameMaster/> },
  { displayText: 'Game Batch', routePath: '/gameBatch', routeElement: <GameBatch/> }
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
          {formList.map((formListObj) => (
              <ListItem disablePadding component={Link} to={formListObj.routePath}>
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
