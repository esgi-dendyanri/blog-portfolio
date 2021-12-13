import { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
} from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"

const pages = ['Products', 'Pricing', 'Blog'];

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = useState<Element | undefined>(undefined);
  
  return (
    <AppBar position="sticky" style={{marginBottom: 10}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => { setAnchorElNav(event.currentTarget) }}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={setAnchorElNav.bind(this, undefined)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={setAnchorElNav.bind(this, undefined)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex"} }}>
            Esgi's Blog
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Esgi's Blog
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={setAnchorElNav.bind(this, undefined)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;