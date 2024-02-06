import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
    role: '*',
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
    role: 'Leader',
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
    role: 'Leader',
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
    role: 'Leader',
  },
];

export default navConfig;
