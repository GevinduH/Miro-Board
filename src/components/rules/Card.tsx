import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard( ) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h5">
        Preview
        </Typography>
        <Typography variant="body2" component="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum quis hic dicta a aperiam. Consectetur ea exercitationem blanditiis voluptatem perspiciatis ducimus quasi recusandae ipsa, ipsum molestias obcaecati sit! Placeat!
        </Typography>
      </CardContent>
    </Card>
  );
}
