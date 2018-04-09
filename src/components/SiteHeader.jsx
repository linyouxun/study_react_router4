import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Dropdown } from 'antd';
import './SiteHeader.scss';

export class SiteHeader extends Component {
  // constructor(props){
  //   super(props);
  // }

  // componentDidMount(){
  // }

  onClick({ key }) {
    console.log(key);
  }

  render() {
    const menu = (
      <Menu onClick={this.onClick.bind(this)}>
        <Menu.Item>
          修改密码
        </Menu.Item>
      </Menu>
    );
    return (
      <header className="component site-header">
        <a className="header-logo" href="/" title="首页" />
        <div className="header-content" />
        <div className="header-action">
          <nav>
            <Dropdown overlay={menu}>
              <span className="action-user-name"><Icon type="logout" /><span>退出系统</span></span>
            </Dropdown>
          </nav>
        </div>
      </header>
    );
  }
}
SiteHeader.propTypes = {};
SiteHeader.contextTypes = {
  dispatch: PropTypes.func,
};
export default SiteHeader;
