import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function AppWidgetBilancio({ title, total, icon, color = 'primary', sx, ...other }) {
  const bilancio = (
    (total.add.map((i) => i.value).reduce((prev, curr) => prev + curr, 0) +
      parseInt(total.eccedenze, 10) -
      total.spent.map((i) => i.value).reduce((prev, curr) => prev + curr, 0)) /
    100
  ).toFixed(2);
  return (
    <Card
      component={Stack}
      spacing={1}
      direction="row"
      justifyContent="center"
      sx={{
        px: 1,
        py: 1,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={0.5} align="center">
        <Typography variant="subtitle2">{`${bilancio} € subTot`}</Typography>

        <Typography variant="h4">{`${(bilancio - 125).toFixed(2)} €`}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

AppWidgetBilancio.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.object,
};
