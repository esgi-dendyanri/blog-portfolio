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
  Drawer,
  Avatar,
  Link,
  Chip,
  List,
} from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import './Nav.css'

let env: any = process.env


console.log("let env: any = process.env", env)
const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const technologies: Array<any> = [
  {
    label: "Javascript",
    img: require("../assets/img/javascript.png").default
  },{
    label: "Typescript",
    img: require("../assets/img/typescript.png").default
  },{
    label: "React JS",
    img: require("../assets/img/reactjs.jpg").default
  },{
    label: "Material UI",
    img: require("../assets/img/mui.png").default
  },{
    label: "Node JS",
    img: require("../assets/img/nodejs.png").default
  },{
    label: "Nest JS",
    img: require("../assets/img/nestjs.png").default
  },{
    label: "Mongo DB",
    img: require("../assets/img/mongodb.jpg").default
  },
];

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = useState<boolean>(false);

  const container = window !== undefined ? () => window.document.body : undefined;
  const drawer = (
    <Box
      sx={{
        color: "white",
        textAlign: "center",
      }}
      p={2}
    >
      <Link href="https://esgi.dev/">
        <Button
          variant="outlined"
          fullWidth
          sx={{
            color: "white",
            borderColor: "white",
            marginBottom: 2,

            "&:hover": {
              color: "primary.main",
              borderColor: "white",
              background: "white",
            }
          }}
          startIcon={<ArrowBackIcon />}
        >
          Back to profile
        </Button>
      </Link>

      <Link href={env.PUBLIC_URL} color="#fff">
        <Typography variant="h4" align="center">Esgi's Blog Portofolio</Typography>
      </Link>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        p={2}
      >
        <Avatar
          alt="Esgi Dendyanri"
          src={require("../assets/img/IMG20220524204222 edit.jpg").default}
          sx={{
            textAlign: "center",
            width: "200px",
            height: "200px",
            border: "4px solid white"
          }}
        />
      </Box>

      <Typography variant="h5">Hi, I am Esgi. Nice to meet you.</Typography>
      <Typography variant="body1">
        Full stack developer with more than 5+ years experience.<br/>
        Extensive knowledge of Modern Web Techniques, such as API, client-side and server-side programing.
      </Typography>

      <Box
        sx={{
          "& a": { color: "white", padding: "10px" }
        }}
        mt={3}
      >
        <Link href="https://www.linkedin.com/in/esgi-dendyanri/" target="_blank">
          <LinkedInIcon fontSize='large'/>
        </Link>
        <Link href="https://www.facebook.com/esgi.dendyanri" target="_blank">
          <FacebookIcon fontSize='large' />
        </Link>
        <Link href="https://github.com/esgi-dendyanri/" target="_blank">
          <GitHubIcon fontSize='large' />
        </Link>
        <Link href="https://www.youtube.com/channel/UCJNQiDEHcsP5iNqyl_VJb0A" target="_blank">
          <YouTubeIcon fontSize='large' />
        </Link>
      </Box>

      <Box mt={3}>
        <Typography variant="body2">Technology used:</Typography>
        <List sx={{
          display: "flex",
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          m: 0,
        }}>
          {technologies.map((technology) => (
            <ListItem key={technology.label}>
              <Chip
                key={technology.label}
                label={technology.label}
                variant="outlined"
                sx={{color: "white"}}
                avatar={<Avatar alt={technology.label} src={technology.img} sx={{bgcolor: "white"}} />}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
      <Link href="https://github.com/esgi-dendyanri/blog-portfolio" target="_blank">
        <Button
          variant="outlined"
          fullWidth
          sx={{
            color: "white",
            borderColor: "white",
            marginBottom: 2,

            "&:hover": {
              color: "primary.main",
              borderColor: "white",
              background: "white",
            }
          }}
          startIcon={<GitHubIcon />}
        >
          Go to Source Code
        </Button>
      </Link>
      </Box>
    </Box>
  );

  return (
    <nav className="nav">
      <AppBar position="sticky" style={{marginBottom: 10, backgroundColor: "var(--backgroud-color)"}} sx={{display: { xs: 'block', sm: 'none' }}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={setAnchorElNav.bind(this, !anchorElNav)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Esgi's Blog Portofolio
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: 'var(--nav-width)' }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
            },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 'var(--nav-width)', backgroundColor: "var(--backgroud-color)" },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          container={container}
          variant="temporary"
          open={anchorElNav}
          sx={{
            display: {
              xs: 'block',
              sm: 'none',
            },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 'var(--nav-width)', backgroundColor: "var(--backgroud-color)" },
          }}
          onClose={setAnchorElNav.bind(this, false)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </nav>
  );
}

export default Nav;