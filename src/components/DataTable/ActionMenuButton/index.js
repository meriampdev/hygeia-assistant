import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 15
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const menuItemIsReactElement = React.isValidElement(props.menuItems)
  return (
    <div className={classes.root}>
      <div className={props.className}>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          endIcon={props.endIcon}
          fullWidth={props.fullWidth}
          className={open ? 'is-open' : ''}
        >
          {
            props.menuProps.displayType === 'icon' ?
              props.menuProps.icon
            : props.text
          }
        </Button>
        <Popper className='action-menuitem' open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex: 1}}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {
                      menuItemIsReactElement ? props.menuItems
                      : props.menuItems.map((item) => {
                          return <MenuItem
                            {...item.props}
                            onClick={()=> item.onClick(props.rowData)}
                            key={`action-menuitem${Math.random()}`}
                          >
                            {item.text}
                          </MenuItem>
                        })
                    }
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
