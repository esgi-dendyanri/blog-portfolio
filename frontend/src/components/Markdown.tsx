import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import "./Markdown.css"
import { Grid } from '@mui/material';

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

const cutOffStyle = {
  height: "100px",
  overflow: "hidden",
  display: "block",

  "&:after": {
    content: " ",
    overflow: "hidden",
    width: "1px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }
}

export default function Markdown(props: any) {
  return (
    <ReactMarkdown options={{
      ...options,
      forceInline: (props.isCutOff)
    }}
    style={props.isCutOff ? cutOffStyle : {}}>
      {props.children}
    </ReactMarkdown>
  )
}