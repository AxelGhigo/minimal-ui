/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
/* eslint-disable react/jsx-curly-brace-presence */
import { useState, forwardRef } from 'react';

import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import roles from '../../utils/lib/roles.json';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FormAddUser({ open, handleClose, handleAddUser }) {
  let ruoli = roles[0];

  const [inputValue, setInputValue] = useState('');

  const [error, setError] = useState({ email: false, name: false, role: false });

  const [avatar, setAvatar] = useState(1);

  const handleError = (event) => {
    if (event.target.value === '') {
      setError({ ...error, [event.target.name]: true });
    } else setError({ ...error, [event.target.name]: false });
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          handleAddUser({ ...formJson, role: inputValue, avatar });
          handleClose();
          event.target.reset();
        },
      }}
    >
      <DialogTitle>New Users</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex' }}>
          <IconButton
            aria-label="delete"
            onClick={() => setAvatar(avatar - 1)}
            disabled={avatar <= 1}
            size="small"
          >
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
          <Avatar
            alt="Remy Sharp"
            src={`/assets/images/avatars/avatar_${avatar}.jpg`}
            sx={{ width: 150, height: 150 }}
          />
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => setAvatar(avatar + 1)}
            disabled={avatar >= 25}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
          <FormGroup
            style={{
              justifyContent: 'center',
            }}
            sx={{ m: 4 }}
          >
            <FormControlLabel name="Verified" control={<Switch />} label="Verified" />
            <FormControlLabel name="Active" control={<Switch />} label="Active" />
          </FormGroup>
        </div>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Nome"
          type="text"
          fullWidth
          variant="outlined"
          error={error.name}
          onChange={handleError}
        />
        <TextField
          required
          margin="dense"
          id="email"
          name="email"
          label="email"
          type="text"
          fullWidth
          variant="outlined"
          error={error.email}
          onChange={handleError}
        />
        <Autocomplete
          id="combo-box-demo"
          value={ruoli}
          onChange={(event, newValue) => {
            ruoli = newValue;
          }}
          options={roles}
          sx={{ width: 300, mt: 1 }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="roles" />}
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={Object.values(error).some((err) => err)}
          type="submit"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FormAddUser.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleAddUser: PropTypes.func,
};
