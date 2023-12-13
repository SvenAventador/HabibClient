import React from 'react';
import {useUser} from '../../state/UserStore'
import SupplierGood from "../../components/supplier/SupplierGood";
import {
    Button,
    Layout,
    Menu,
} from "antd";
import Sider from "antd/es/layout/Sider";
import {
    AppleOutlined,
    AppstoreAddOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons";
import Swal from "sweetalert2";
import SupplierComposition from "../../components/supplier/SupplierComposition";

const SupplierPage = () => {
    const {
        logoutUser
    } = useUser()

    const [collapsed, setCollapsed] = React.useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = React.useState('composition');

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleMenuSelect = ({key}) => {
        setSelectedMenuItem(key);
    };

    const renderContext = () => {
        switch (selectedMenuItem) {
            case 'composition':
                return <SupplierComposition />
            case 'device':
                return <SupplierGood/>
            default:
                return null
        }
    }

    return (
        <Layout style={{height: '100vh'}}>
            <Sider collapsible
                   width={300}
                   style={{background: 'var(--white)'}}
                   collapsed={collapsed}>
                <div className={collapsed ? 'menu-header-collapsed' : ''}>
                    <Button
                        type="text"
                        onClick={toggleCollapsed}
                        className="collapse-button"
                        style={{
                            backgroundColor: '#fff',
                            width: '80px',
                            marginRight: '1rem',
                            marginBottom: '.5rem'
                        }}>
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                </div>
                <Menu mode="vertical"
                      selectedKeys={[selectedMenuItem]}
                      onSelect={handleMenuSelect}
                      items={[
                          {
                              key: 'composition',
                              icon: <AppstoreAddOutlined />,
                              label: 'Составляющие'
                          },
                          {
                              key: 'device',
                              icon: <AppleOutlined />,
                              label: 'Товары'
                          },
                          {
                              key: 'logout',
                              icon: <LogoutOutlined/>,
                              label: 'Выйти из аккаунта',
                              onClick: () => {
                                  logoutUser().then(() => {
                                      return Swal.fire({
                                          title: 'Внимание!',
                                          text: 'До скорых встреч!',
                                          icon: 'success'
                                      })
                                  })
                              }
                          },
                      ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Layout.Content>
                    {renderContext()}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default SupplierPage;
