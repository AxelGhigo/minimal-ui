/* eslint-disable import/no-unresolved */
import { faker } from '@faker-js/faker';
/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRouter } from 'src/routes/hooks';

import { callUserAPI } from 'src/utils/lib/callAPI/users';

import { AuthData } from 'src/auth/AuthWrapper';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import FormAddUser from '../form-add-user';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const router = useRouter();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);

  const [isLoadig, setIsLoading] = useState(true);

  const { user, logout } = AuthData();

  console.log(AuthData());

  useEffect(() => {
    callUserAPI
      .getAll(user.jwt)
      .then((response) => response.json())
      .then((res) => {
        if (res.checkToken.status !== 200) logout();
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [logout, router, user.jwt]);

  const handleDeletUser = (id) => {
    callUserAPI
      .delete(user.jwt, id)
      .then((response) => response.json())
      .then((res) => {
        if (res.status !== 200) logout();
        setUsers(res.data);
      })
      .catch((error) => console.error(error));
  };
  const handleChangeUser = (row) => {
    callUserAPI
      .update(user.jwt, row.id, {
        avatarUrl: row.avatar,
        name: row.nome.value,
        email: row.email.value,
        password: row.password.value,
        isVerified: row.verified,
        status: row.active ? 'active' : 'banned',
        role: row.roles.value,
      })
      .then((response) => response.json())
      .then((res) => {
        if (res.status !== 200) logout();
        setUsers(res.data);
      })
      .catch((error) => console.error(error));
  };

  const handleAddUser = (utente) => {
    setUsers(
      users.concat({
        id: faker.string.uuid(),
        avatarUrl: utente.avatar,
        name: utente.nome.value,
        email: utente.email.value,
        password: utente.password.value,
        isVerified: utente.verified,
        status: utente.active ? 'active' : 'banned',
        role: utente.roles.value,
      })
    );
    setOpen(false);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New user
        </Button>
      </Stack>

      <FormAddUser open={open} handleClose={() => setOpen(false)} handleAddUser={handleAddUser} />

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'role', label: 'Role' },
                  { id: 'psw', label: 'password' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />

              {isLoadig ? (
                <TableBody>
                  {[...Array(3)].map(() => (
                    <TableRow>
                      <TableCell>
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                      </TableCell>
                      {[...Array(6)].map(() => (
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        name={row.name}
                        role={row.role}
                        psw={row.password}
                        status={row.status}
                        email={row.email}
                        avatarUrl={row.avatarUrl}
                        isVerified={row.isVerified}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                        handleDeletUser={() => handleDeletUser(row.id)}
                        handleChangeUser={(event) => handleChangeUser({ ...event, id: row.id })}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, users.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
