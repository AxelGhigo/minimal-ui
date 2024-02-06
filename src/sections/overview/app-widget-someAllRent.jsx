import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function AppWidgetSumAllRent({
  title,
  total,
  icon,
  color = 'primary',
  operation,
  sx,
  ...other
}) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      justifyContent="center"
      sx={{
        px: 1,
        py: 2,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={1.5} align="center">
        <Typography variant="h4" color={operation === '+' ? 'success.main' : 'error'}>
          {`${operation} ${
            total.map((i) => i.value).reduce((prev, curr) => prev + curr, 0) / 100
          } €`}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

AppWidgetSumAllRent.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  operation: PropTypes.string,
  total: PropTypes.array,
};
