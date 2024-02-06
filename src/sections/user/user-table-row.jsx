import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import roles from '../../utils/lib/roles.json';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  email,
  role,
  psw,
  isVerified,
  status,
  handleClick,
  handleDeletUser,
  handleChangeUser,
}) {
  const [open, setOpen] = useState(null);
  const [change, setChange] = useState(false);

  const [inputValue, setInputValue] = useState({
    avatar: avatarUrl,
    nome: {
      value: name,
      error: false,
    },
    email: {
      value: email,
      error: false,
    },
    password: {
      value: psw,
      error: false,
    },
    roles: {
      input: role,
      value: role,
      error: false,
    },
    verified: isVerified ? 'yes' : 'no',
    active: status === 'active',
  });

  const handelChange = (e) => {
    console.log(e.target.name);
    setInputValue({
      ...inputValue,
      [e.target.name]: { value: e.target.value, error: e.target.value === '' },
    });
  };

  console.log(inputValue);

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
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={`/assets/images/avatars/avatar_${avatarUrl}.jpg`} />
            <Typography variant="subtitle2" noWrap>
              {change ? (
                <TextField
                  id="standard-basic"
                  variant="standard"
                  name="nome"
                  error={inputValue.nome.error}
                  value={inputValue.nome.value}
                  onChange={handelChange}
                />
              ) : (
                name
              )}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          {change ? (
            <TextField
              id="standard-basic"
              variant="standard"
              name="email"
              error={inputValue.email.error}
              value={inputValue.email.value}
              onChange={handelChange}
            />
          ) : (
            email
          )}
        </TableCell>

        <TableCell>
          {change ? (
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
              sx={{ width: 200, mt: 1 }}
              inputValue={inputValue.roles.value}
              onInputChange={(event, newInputValue) => {
                setInputValue({
                  ...inputValue,
                  roles: { ...inputValue.roles, value: newInputValue, error: newInputValue === '' },
                });
              }}
              renderInput={(params) => (
                <TextField error={inputValue.roles.error} {...params} variant="standard" />
              )}
            />
          ) : (
            role
          )}
        </TableCell>

        <TableCell>
          {change ? (
            <TextField
              id="standard-basic"
              variant="standard"
              name="password"
              error={inputValue.password.error}
              value={inputValue.password.value}
              onChange={handelChange}
            />
          ) : (
            '*************'
          )}
        </TableCell>

        <TableCell align="center">
          {change ? (
            <FormControlLabel
              name="Verified"
              labelPlacement="top"
              checked={inputValue.verified === 'yes'}
              onClick={(event) =>
                setInputValue({ ...inputValue, verified: event.target.checked ? 'yes' : 'no' })
              }
              control={<AntSwitch inputProps={{ 'aria-label': 'ant design' }} />}
              label="Verified"
            />
          ) : (
            inputValue.verified
          )}
        </TableCell>

        <TableCell align="center">
          {change ? (
            <FormControlLabel
              name="Active"
              labelPlacement="top"
              checked={inputValue.active}
              onClick={(e) => setInputValue({ ...inputValue, active: e.target.checked })}
              control={<AntSwitch inputProps={{ 'aria-label': 'ant design' }} />}
              label="Active"
            />
          ) : (
            <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
          )}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={(e) => setOpen(e.currentTarget)}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      {change ? (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={() => setOpen(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem
            onClick={() => {
              handleChangeUser(inputValue);
              setOpen(null);
              setChange(false);
            }}
            disabled={Object.values(inputValue).some((v) => {
              if (v.value !== undefined) return v.value === '';
              return false;
            })}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            save
          </MenuItem>

          <MenuItem
            onClick={() => {
              setOpen(null);
              setChange(false);
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            anulla
          </MenuItem>
        </Popover>
      ) : (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={() => setOpen(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem
            onClick={() => {
              setOpen(null);
              setChange(true);
            }}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>

          <MenuItem onClick={handleDeletUser} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>
      )}
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  handleDeletUser: PropTypes.func,
  handleChangeUser: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  psw: PropTypes.string,
};
