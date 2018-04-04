import { Router, Route, Link } from 'react-router';
import Home from './containers/Index';
import NotFound from './containers/NotFound';
import TestDOM from './containers/TestDOM';
import TestDOMInner from './containers/TestDOMInner';
// noMenu 1<<0显示（默认），1<<1不显示
const routes = [{
  path: '/',
  name: '首页',
  component: Home
}, {
  path: '/test',
  name: '测试',
  component: TestDOM,
  children: [{
    path: '/1',
    name: '测试1',
    component: TestDOMInner
  }, {
    path: '/2',
    name: '测试2',
    component: TestDOMInner
  }]
}, {
  path: '*',
  name: '没有找到',
  noMenu: 1<<1,
  component: NotFound
}]
export default routes