/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
/* eslint-disable react/jsx-curly-brace-presence */
import { useState, forwardRef } from 'react';

import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Visibility from '@mui/icons-material/Visibility';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import roles from '../../utils/lib/roles.json';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FormAddUser({ open, handleClose, handleAddUser }) {
  const [inputValue, setInputValue] = useState({
    avatar: 1,
    nome: {
      value: '',
      error: false,
    },
    email: {
      value: '',
      error: false,
    },
    password: {
      value: '',
      error: false,
    },
    roles: {
      input: 'Leader',
      value: '',
      error: false,
    },
    verified: 'no',
    active: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handelChange = (e) => {
    console.log(e.target.name);
    setInputValue({
      ...inputValue,
      [e.target.name]: { value: e.target.value, error: e.target.value === '' },
    });
  };

  // style Switch
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>New Users</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex' }}>
          <IconButton
            aria-label="delete"
            onClick={() => setInputValue({ ...inputValue, avatar: inputValue.avatar - 1 })}
            disabled={inputValue.avatar <= 1}
            size="small"
          >
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
          <Avatar
            alt="Remy Sharp"
            src={`/assets/images/avatars/avatar_${inputValue.avatar}.jpg`}
            sx={{ width: 150, height: 150 }}
          />
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => setInputValue({ ...inputValue, avatar: inputValue.avatar + 1 })}
            disabled={inputValue.avatar >= 25}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
          <FormGroup
            style={{
              justifyContent: 'center',
            }}
            sx={{ m: 4 }}
          >
            <FormControlLabel
              name="Verified"
              checked={inputValue.verified === 'yes'}
              onClick={(event) =>
                setInputValue({ ...inputValue, verified: event.target.checked ? 'yes' : 'no' })
              }
              control={<AntSwitch inputProps={{ 'aria-label': 'ant design' }} />}
              label="Verified"
            />
            <FormControlLabel
              name="Active"
              checked={inputValue.active}
              onClick={(e) => setInputValue({ ...inputValue, active: e.target.checked })}
              control={<AntSwitch inputProps={{ 'aria-label': 'ant design' }} />}
              label="Active"
            />
          </FormGroup>
        </div>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="nome"
          label="Nome"
          type="text"
          fullWidth
          variant="outlined"
          error={inputValue.nome.error}
          onChange={handelChange}
          value={inputValue.nome.value}
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
          error={inputValue.email.error}
          onChange={handelChange}
          value={inputValue.email.value}
        />

        <FormControl sx={{ my: 1, width: '25ch' }} style={{ display: 'flex' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handelChange}
            value={inputValue.password.value}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
          />
          <Autocomplete
            id="combo-box-demo"
            value={inputValue.roles.input}
            onChange={(event, newValue) => {
              setInputValue({
                ...inputValue,
                roles: { ...inputValue.roles, input: newValue },
              });
            }}
            options={roles}
            sx={{ width: '25ch', my: 1 }}
            inputValue={inputValue.roles.value}
            onInputChange={(event, newInputValue) => {
              setInputValue({
                ...inputValue,
                roles: { ...inputValue.roles, value: newInputValue, error: newInputValue === '' },
              });
            }}
            renderInput={(params) => (
              <TextField error={inputValue.roles.error} {...params} label="roles" />
            )}
          />
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={Object.values(inputValue).some((v) => {
            if (v.value !== undefined) return v.value === '';
            return false;
          })}
          onClick={() => {
            handleAddUser(inputValue);
            setInputValue({
              avatar: 1,
              nome: {
                value: '',
                error: false,
              },
              email: {
                value: '',
                error: false,
              },
              password: {
                value: '',
                error: false,
              },
              roles: {
                input: 'Leader',
                value: '',
                error: false,
              },
              verified: 'no',
              active: false,
            });
          }}
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
