import React, { lazy, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined
} from '@ant-design/icons'
import styles from './index.module.scss'
import { Route, Switch, Link } from 'react-router-dom'

import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfoAction, logout } from '@/store/actions'
import { CloseOutlined } from '@ant-design/icons'
import { Popconfirm, message } from 'antd'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const { Header, Content, Sider } = Layout

const Home = lazy(() => import('../Home'))
const Article = lazy(() => import('../Article'))
const Publish = lazy(() => import('../Publish'))

export default function MyLayout() {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfoAction())
  }, [dispatch])

  const userInfo = useSelector((state) => {
    return state.user
  })
  const history = useHistory()
  const confirm = () => {
    dispatch(logout())
    message.success('退出成功', 1, () => {
      history.push('/login')
    })
  }
  return (
    <div className={styles.root}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <div className="user-info">
            <span className="user-name">{userInfo.name}</span>
            <Popconfirm
              placement="topRight"
              title="你确定要退出本系统吗?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <span className="close">
                <CloseOutlined />
                退出
              </span>
            </Popconfirm>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              style={{ height: '100%', borderRight: 0 }}
              theme="dark"
            >
              <Menu.Item key="/home" icon={<PieChartOutlined />}>
                <Link to="/home">数据概览</Link>
              </Menu.Item>
              <Menu.Item key="/home/article" icon={<DesktopOutlined />}>
                <Link to="/home/article">内容管理</Link>
              </Menu.Item>
              <Menu.Item key="/home/publish" icon={<ContainerOutlined />}>
                <Link to="/home/publish">发布文章</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                backgroundColor: '#fff '
              }}
            >
              <Switch>
                <Route exact path="/home" component={Home}></Route>
                <Route path="/home/article" component={Article}></Route>
                {/* 添加文章 */}
                <Route
                  exact
                  path="/home/publish"
                  key="add"
                  component={Publish}
                ></Route>
                {/* 修改文章 */}
                <Route
                  path="/home/publish/:id"
                  key="edit"
                  component={Publish}
                ></Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}
