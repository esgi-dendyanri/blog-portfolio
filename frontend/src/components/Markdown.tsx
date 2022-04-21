import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import "./Markdown.css"

function MarkdownListItem(props: any) {
  return <Box component="li" sx={{ mt: 1, typography: 'body1' }} {...props} />;
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
        component: 'h1',
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6', component: 'h2' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'caption',
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: { component: Link },
    li: {
      component: MarkdownListItem,
    },
  },
};

export default function Markdown(props: any) {
  return (
    <div className={props.className}>
      <Link href={props.url} color="inherit" variant='body2'>
        <Typography variant="h4" component="h1" gutterBottom={true}>
          {props.title}
        </Typography>
      </Link>

      <div className={props.isCutOff ? "cut-markdown" : ""}>
        <ReactMarkdown options={options}>
          {props.children}
        </ReactMarkdown>

        { props.isCutOff ? (
          <div className='cut-markdown-gradient'>
          </div>
        ): false}
      </div>
    </div>
  )
}