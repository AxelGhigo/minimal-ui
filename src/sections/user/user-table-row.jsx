import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';

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
  isVerified,
  status,
  handleClick,
  handleDeletUser,
  handleChangeUser,
}) {
  const [open, setOpen] = useState(null);
  const [change, setChange] = useState(false);
  const [row, setRow] = useState({ email, name, avatarUrl, role, isVerified, status });
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState({ email: false, name: false, role: false });

  const [value, setValue] = useState(role);

  const handleOpenMenu = (event) => setOpen(event.currentTarget);

  const handleChangerow = () => {
    if (Object.values(error).every((err) => !err)) {
      handleChangeUser(row);
      handleCloseMenu(true);
    }
  };
  const handleopenChange = () => {
    setChange(true);
    setOpen(null);
  };

  const handleCloseMenu = (isupdate) => {
    if (isupdate) setChange(false);
    setOpen(null);
  };

  const handleRow = (event) => {
    setRow({ ...row, [event.target.name]: event.target.value });
    if (event.target.value === '') {
      setError({ ...error, [event.target.name]: true });
    } else setError({ ...error, [event.target.name]: false });
  };

  const handlsetInputValue = (newRole) => {
    setRow({ ...row, role: newRole });
    if (newRole === '') {
      setError({ ...error, role: true });
    } else setError({ ...error, role: false });
    setInputValue(newRole);
  };

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
                  name="name"
                  error={error.name}
                  value={row.name}
                  onChange={handleRow}
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
              error={error.email}
              value={row.email}
              onChange={handleRow}
            />
          ) : (
            email
          )}
        </TableCell>

        <TableCell>
          {change ? (
            <Autocomplete
              id="combo-box-demo"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              options={roles}
              sx={{ width: 300, mt: 1 }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                handlsetInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  {...params}
                  error={error.role}
                  label="role"
                  name="role"
                />
              )}
            />
          ) : (
            role
          )}
        </TableCell>

        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      {change ? (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={() => handleCloseMenu(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={handleChangerow} disabled={Object.values(error).some((err) => err)}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            save
          </MenuItem>

          <MenuItem onClick={() => handleCloseMenu(true)} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            anulla
          </MenuItem>
        </Popover>
      ) : (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={() => handleCloseMenu(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={handleopenChange}>
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
};
