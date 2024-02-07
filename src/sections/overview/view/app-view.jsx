/* eslint-disable import/no-unresolved */
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { nowDate } from 'src/utils/format-time';
import { callPaymentAPI } from 'src/utils/lib/callAPI/payment';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppParentRent from '../app-parent-rent';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppWidgetBilancio from '../app-widget-bnilancio';
import AppConversionRates from '../app-conversion-rates';
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
      .delete(id)
      .then((response) => response.json())
      .then(() =>
        callPaymentAPI
          .getAll(currenDate)
          .then((response) => response.json())
          .then((data) => setPayment(data))
          .catch((error) => console.error(error))
      )
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
      .then(() =>
        callPaymentAPI
          .getAll(currenDate)
          .then((response) => response.json())
          .then((data) => setPayment(data))
          .catch((error) => console.error(error))
      )
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
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={6} sm={6} md={3}>
          <AppWidgetSummary
            title="Mese corrente"
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
            date={{ mese: payment.data.mese, anno: payment.data.anno }}
            handelAdd={handelAdd}
            loadig={loadig}
          />
        </Grid>
        <Grid xs={12} sm={10} md={6}>
          <AppParentRent
            title="Spesi"
            operation="-"
            list={payment.data.spent}
            handelDelet={handelDelet}
            date={{ mese: payment.data.mese, anno: payment.data.anno }}
            handelAdd={handelAdd}
            loadig={loadig}
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

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
