import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

function Navbar() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <Layout>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <div className="logo" style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>My App</div>

        {/* Hamburger Menu for Mobile/Tablet */}
        <Button 
          className="mobile-menu" 
          icon={<MenuOutlined />} 
          onClick={showDrawer}
          style={{ display: 'block', marginLeft: 'auto', background: 'transparent', border: 'none', color: 'white' }}
        />

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          visible={drawerVisible}
        >
          <Menu mode="vertical">
            <Menu.Item key="1"><a href="#home">Home</a></Menu.Item>
            <Menu.Item key="2"><a href="#about">About</a></Menu.Item>
            <Menu.Item key="3"><a href="#contact">Contact</a></Menu.Item>
          </Menu>
        </Drawer>

        {/* Desktop Menu */}
        <Menu theme="dark" mode="horizontal" style={{ display: 'inline-block', width: 'auto' }}>
          <Menu.Item key="1"><a href="#home">Home</a></Menu.Item>
          <Menu.Item key="2"><a href="#about">About</a></Menu.Item>
          <Menu.Item key="3"><a href="#contact">Contact</a></Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}

export default Navbar;
