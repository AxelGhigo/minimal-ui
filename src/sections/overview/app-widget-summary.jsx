/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { numbToMounth } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({
  title,
  total,
  icon,
  handelSetMouth,
  color = 'primary',
  sx,
  ...other
}) {
  return (
    <Card
      component={Stack}
      spacing={1}
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
      <IconButton
        aria-label="delete"
        onClick={() =>
          handelSetMouth(
            total.mese === 1 ? 12 : total.mese - 1,
            total.mese === 1 ? total.anno - 1 : total.anno
          )
        }
        size="large"
      >
        <ArrowBackIosNewIcon fontSize="inherit" />
      </IconButton>
      <Stack spacing={1.5} align="center">
        <Typography variant="h4">{numbToMounth(total.mese - 1)}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
      <IconButton
        aria-label="delete"
        onClick={() =>
          handelSetMouth(
            total.mese === 12 ? 1 : total.mese + 1,
            total.mese === 12 ? parseInt(total.anno, 10) + 1 : total.anno
          )
        }
        size="large"
      >
        <ArrowForwardIosIcon fontSize="inherit" />
      </IconButton>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.object,
  handelSetMouth: PropTypes.func,
};
