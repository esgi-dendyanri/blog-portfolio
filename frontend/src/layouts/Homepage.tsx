import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './Homepage.css';
import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode
}

const Homepage: React.FunctionComponent<any> = (props: Props) => {
  return (
    <div className='wrapper'>
      <Nav/>

      <Box
        component='main'
        className='main'
      >
        <Container>
          <Grid container spacing={5}>
            {props.children}
            <Grid item xs={12}>
              <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default Homepage