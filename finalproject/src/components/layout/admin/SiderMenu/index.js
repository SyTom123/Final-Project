import { Menu } from "antd"
import {DashboardOutlined, BankOutlined, UnorderedListOutlined, ProfileOutlined} from '@ant-design/icons'
import { Link, useLocation } from "react-router-dom"
function SiderMenu () { 
  const location = useLocation();

    const items = [
        {
            key: "/admin",
            label: <Link to = "/admin">Tổng quan</Link>,
            icon: <DashboardOutlined />,
        },
        {
            key: "/admin/companyInfo",
            label: <Link to= 'companyInfo'>Thông tin công ty</Link>,
            icon:<BankOutlined />,
        },
        {
            key: "/admin/jobsManager",
            label: <Link to= 'jobsManager'>Quản lý việc làm</Link>,
            icon: <UnorderedListOutlined />,
        },
        {
            key: "/admin/cvManager",
            label:<Link to= 'cvManager'>Quản lý CV</Link>,
            icon: <ProfileOutlined />,
        },
    ]
    return (
        <>
            <Menu items={items}  defaultOpenKeys={["admin"]}
            defaultSelectedKeys={[location.pathname]}>
            </Menu>
        </>
    )
}
export default SiderMenu