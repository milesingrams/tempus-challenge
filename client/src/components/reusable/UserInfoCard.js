import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  card: {
    width: 500,
    marginBottom: '1rem'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function UserInfoCard ({ user, expanded }) {
  const classes = useStyles();

  function nameToInitials (name) {
    let nameSplit = name.trim().split(' ')
    let initials = nameSplit[0].charAt(0)
    if (nameSplit.length > 1) {
      initials += nameSplit[nameSplit.length - 1].charAt(0)
    }
    return initials.toUpperCase()
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {nameToInitials(user.name)}
          </Avatar>
        }
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={user.name}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography variant="body1" gutterBottom>
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Age:</strong> {user.age}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Phone:</strong> {user.phone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Address:</strong> {user.address}
        </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
