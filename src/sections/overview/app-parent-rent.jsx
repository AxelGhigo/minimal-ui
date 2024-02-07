import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

// eslint-disable-next-line import/no-unresolved
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function AppParentRent({
  title,
  subheader,
  list,
  operation,
  handelDelet,
  handelAdd,
  date,
  loadig,
}) {
  const [selected, setSelected] = useState(['2']);
  const [open, setOpen] = useState(false);
  const [pay, setPay] = useState({
    value: '',
    description: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPay({
      value: '',
      description: '',
    });
    setOpen(false);
  };

  const handleClickComplete = (taskId) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  const handelPay = (e) => {
    setPay({ ...pay, [e.target.name]: e.target.value });
  };

  return (
    <Card sx={{ pb: 2 }}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <IconButton aria-label="settings" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        }
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {operation === '+' ? 'Aggiungi soldi' : 'aggiundi spese'}
        </DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-amount"
              type="number"
              endAdornment={<InputAdornment position="end">€</InputAdornment>}
              label="Amount"
              name="value"
              error={pay.value === ''}
              value={pay.value}
              onChange={handelPay}
            />
          </FormControl>
          <TextField
            id="filled-description"
            label="description"
            variant="standard"
            name="description"
            value={pay.description}
            onChange={handelPay}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Annulla
          </Button>
          <Button
            variant="contained"
            disabled={pay.value === ''}
            onClick={() => {
              handelAdd(pay.value, pay.description, operation, date.mese, date.anno);
              handleClose();
            }}
            color="success"
          >
            Salva
          </Button>
        </DialogActions>
      </Dialog>

      {loadig ? (
        <>
          <Skeleton sx={{ m: 2 }} />
          <Skeleton sx={{ m: 2 }} />
          <Skeleton sx={{ m: 2 }} />
        </>
      ) : (
        list.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            checked={selected.includes(task.id)}
            onChange={() => handleClickComplete(task.id)}
            handelDelet={() => handelDelet(task.id)}
            operation={operation}
          />
        ))
      )}
    </Card>
  );
}

AppParentRent.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
  handelDelet: PropTypes.func,
  handelAdd: PropTypes.func,
  operation: PropTypes.string,
  loadig: PropTypes.bool,
  date: PropTypes.object,
};

// ----------------------------------------------------------------------

function TaskItem({ task, checked, onChange, operation, handelDelet }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.info('EDIT', task.id);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          pl: 2,
          pr: 1,
          py: 1,
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
        }}
      >
        <Typography sx={{ flexGrow: 1, m: 0 }}>{task.description}</Typography>
        <Chip
          label={`${task.operation} ${task.value / 100} €`}
          color={task.operation === '+' ? 'success' : 'error'}
        />

        <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            handelDelet();
            setOpen(null);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  operation: PropTypes.string,
  onChange: PropTypes.func,
  task: PropTypes.object,
  handelDelet: PropTypes.func,
};
