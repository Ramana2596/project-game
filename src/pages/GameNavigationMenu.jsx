
import Box from '@mui/material/Box';
import { Divider, Drawer, List, ListItemButton, ListItem, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";
import { useUser } from "../core/access/userContext.js";

export default function TemporaryDrawer({ openState, toggleDrawer }) {
  const { userAccessiblePages } = useUser();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {userAccessiblePages?.map((componentObj) => (
          <ListItem sx={{ color: 'black' }} disablePadding component={Link} to={componentObj.routePath}>
            <ListItemButton>
              <ListItemText primary={componentObj.displayText} />
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
