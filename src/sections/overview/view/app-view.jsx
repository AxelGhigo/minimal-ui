/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';

import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { nowDate, numbToMounth } from 'src/utils/format-time';
import { callPaymentAPI } from 'src/utils/lib/callAPI/payment';

import AppParentRent from '../app-parent-rent';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppWidgetBilancio from '../app-widget-bnilancio';
import AppWidgetSumAllRent from '../app-widget-someAllRent';

// ----------------------------------------------------------------------

export default function AppView() {
  const [payment, setPayment] = useState({
    data: {
      anno: 0,
      mese: 0,
      add: [],
      spent: [],
    },
  });
  const DATA = new Date();

  const [loadig, setLoadig] = useState(true);
  const [currenDate, setCurrenDate] = useState(
    `?mese=${DATA.getMonth() + 1}&anno=${DATA.getFullYear()}`
  );

  const handelDelet = (id) => {
    callPaymentAPI
      .delete(id, currenDate)
      .then((response) => response.json())
      .then((data) => setPayment(data))
      .catch((error) => console.error(error));
  };

  const handelModify = (value, description, id, mese, anno) => {
    console.log(value, description, id);
    callPaymentAPI
      .update(id, { value: value * 100, description, mese, anno })
      .then((response) => response.json())
      .then((res) => setPayment(res))
      .catch((error) => console.error(error));
  };

  const handelAdd = (valore, description, operation, MESE, ANNO) => {
    console.log(valore, description, operation, MESE, ANNO);
    callPaymentAPI
      .create({
        value: valore * 100,
        description,
        operation,
        createDate: nowDate(),
        mese: MESE,
        anno: ANNO,
      })
      .then((response) => response.json())
      .then((res) => setPayment(res))
      .catch((error) => console.error(error));
  };

  const handelSetMouth = (mese, anno) => {
    console.log(mese, anno);
    callPaymentAPI
      .getAll(`?mese=${mese}&anno=${anno}`)
      .then((response) => response.json())
      .then((data) => {
        setPayment(data);
        setCurrenDate(`?mese=${mese}&anno=${anno}`);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    callPaymentAPI
      .getAll()
      .then((response) => response.json())
      .then((data) => {
        setPayment(data);
        setLoadig(false);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(payment);

  const eccedenza = (
    <Typography>
      eccedenza di {numbToMounth(payment.data.mese - 2)}
      <Chip
        sx={{ ml: 1 }}
        label={`${payment.data.eccedenze / 100} €`}
        color={payment.data.eccedenze - 12500 > 0 ? 'success' : 'error'}
      />
    </Typography>
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={6} sm={6} md={3}>
          <AppWidgetSummary
            title="Mese"
            total={payment.data}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            handelSetMouth={handelSetMouth}
          />
        </Grid>

        <Grid xs={6} sm={6} md={3}>
          <AppWidgetBilancio
            title="Bilancio mese"
            total={payment.data}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={6} sm={6} md={3}>
          <AppWidgetSumAllRent
            title="Entrate mese"
            operation="+"
            total={payment.data.add}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={6} sm={6} md={3}>
          <AppWidgetSumAllRent
            title="Uscite mese"
            operation="-"
            total={payment.data.spent}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={10} md={6}>
          <AppParentRent
            title="Aggiunti"
            list={payment.data.add}
            operation="+"
            handelDelet={handelDelet}
            eccedenza={payment.data.eccedenze > 0 ? eccedenza : null}
            date={{ mese: payment.data.mese, anno: payment.data.anno }}
            handelAdd={handelAdd}
            loadig={loadig}
            handelModify={handelModify}
          />
        </Grid>
        <Grid xs={12} sm={10} md={6}>
          <AppParentRent
            title="Spesi"
            operation="-"
            list={payment.data.spent}
            handelDelet={handelDelet}
            eccedenza={payment.data.eccedenze < 0 ? eccedenza : null}
            date={{ mese: payment.data.mese, anno: payment.data.anno }}
            handelAdd={handelAdd}
            loadig={loadig}
            handelModify={handelModify}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Entrate/Uscite"
            loadig={loadig}
            chart={{
              series: [
                { label: 'Entrate', value: parseInt(payment.data.totAdd, 10) / 100 },
                { label: 'Uscite', value: parseInt(payment.data.totSpent, 10) / 100 },
                { label: 'quota mesile', value: 125 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
