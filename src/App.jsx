import React from "react";
import {
  Switch, 
  Route,
  Link,
  // matchPath,
  withRouter,
} from 'react-router-dom';
import { Menu, Icon, Layout, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item } = Menu;
import SiteHeader from './components/SiteHeader';
import routes from './routes';
import './App.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  }
  onClickSilderMenu({key: path}) {
    this.props.history.push(path);
    
    // 匹配路由
    // let matchURL = matchPath(window.location.pathname, {
    //   path,
    //   exact: true,
    //   strict: true
    // });
    // console.log(matchURL)
    // let reg = new RegExp(key);
    // if (!reg.test(window.location.pathname)) {

    // }
  }

  render() {
    let menus = routes.filter(item => item.noMenu !== 2).map((item, index) => {
      if (!!item.children && item.children.length > 0) {
        let childrenRoutes = item.children;
        return <SubMenu
          key={!!item.key ? item.key : item.path}
          title={<span><Icon type="team" /><span>{item.name}</span></span>}
        >
          {childrenRoutes.filter(item => item.noMenu !== 2).map((item2, index2) => {
            return <Item key={(!!item.key ? item.key : item.path) + (!!item2.key ? item2.key : item2.path)}>{item2.name}</Item>
          })}
        </SubMenu>
      }
      return <Item key={!!item.key ? item.key : item.path}>
        <Icon type="pie-chart" />
        <span>{item.name}</span>
      </Item>
    })
    let routesTemp = [];
    for (let i = 0; i < routes.length; i++) {
      let route = {...routes[i]};
      if (!!route.children && route.children.length > 0) {
        for (let j = 0; j < route.children.length; j++) {
          let route2 = {...route.children[j]};
          routesTemp.push({
            ...route2,
            path: route.path + route2.path,
            key: !!route2.key ? route2.key : (route.path + route2.path)
          });
        }
      } 
      delete route['children'];
      routesTemp.push({
        ...route,
        key: !!route.key ? route.key : route.path
      });
    }
    return (
    <div>
      <SiteHeader/>
      <Layout className='wrapper'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse.bind(this)}
        >
          <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" onClick={this.onClickSilderMenu.bind(this)}>
            {menus}
          </Menu> 
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                {routesTemp.map((item, index) => <Route exact strict key={item.key} {...item} />)}
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            test @ 阿斯达斯达舒对
          </Footer>
        </Layout>
      </Layout>
    </div>)
  }
}

export default withRouter(App);