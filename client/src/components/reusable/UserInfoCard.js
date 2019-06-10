import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
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
  header: {
    padding: '.25rem',
    paddingLeft: '.75rem'
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

export default function UserInfoCard ({ user, expanded, editable }) {
  let [editMode, setEditMode] = useState(false);

  let classes = useStyles();

  let onEditModeClick = function (e) {
    setEditMode(!editMode);
    e.stopPropagation();
  };

  let onSaveEditsClick = function (e) {
    setEditMode(false);
    e.stopPropagation();
  };

  let editActionButtons = function () {
    if (!expanded || !editable) return null
    if (editMode) {
      return (
        <div>
          <Button size="small" color="primary" onClick={e => onSaveEditsClick(e)}>
            Save Edits
          </Button>
          <Button size="small" color="primary" onClick={e => onEditModeClick(e)}>
            Cancel Edits
          </Button>
        </div>
      );
    } else {
      return (
        <Button size="small" color="primary" onClick={e => onEditModeClick(e)}>
          Edit Info
        </Button>
      );
    }
  }

  let nameToInitials = function (name) {
    let nameSplit = name.trim().split(' ')
    let initials = nameSplit[0].charAt(0)
    if (nameSplit.length > 1) {
      initials += nameSplit[nameSplit.length - 1].charAt(0)
    }
    return initials.toUpperCase()
  };

  useEffect(() => {
    setEditMode(false);
  }, [expanded]);

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar className={classes.avatar}>
            {nameToInitials(user.name)}
          </Avatar>
        }
        action={
          <CardActions>
            {editActionButtons()}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
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
