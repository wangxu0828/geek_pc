import React, { useEffect, useRef } from 'react'

import styles from './index.module.scss'

import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Select,
  DatePicker,
  Button,
  Table,
  Image,
  Tooltip,
  Space,
  Popconfirm,
  message
} from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleList, getChannelList, delArticle } from '@/store/actions'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import history from '@/utils/history'

export default function Article() {
  const paramsRef = useRef({})

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChannelList())
    dispatch(getArticleList())
  }, [dispatch])

  const Finish = (value) => {
    if (value.status !== -1) {
      paramsRef.current.status = value.status
    }

    paramsRef.current.channel_id = value.channel_id

    if (value.date) {
      paramsRef.current.begin_pubdate = value.date[0]
        .startOf()
        .format('YYYY-MM-DD HH:mm:ss')
      paramsRef.current.end_pubdate = value.date[1]
        .endOf()
        .format('YYYY-MM-DD HH:mm:ss')
    }
    // 从第一页开始筛选
    paramsRef.current.page = 1
    dispatch(getArticleList(paramsRef.current))
  }

  const channels = useSelector((state) => state.article.channelList)
  const articles = useSelector((state) => state.article.articleList)

  const del = async (id) => {
    await dispatch(delArticle(id))
    await dispatch(getArticleList(paramsRef.current))
    message.success('删除成功')
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      render(h) {
        if (h.images.length !== 0) {
          return <Image width={100} height={100} src={h.images[0]}></Image>
        } else {
          return (
            <Image
              width={100}
              height={100}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            ></Image>
          )
        }
      }
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(h) {
        return (
          <div>
            {h === 0
              ? '草稿'
              : h === 1
              ? '审核'
              : h === 2
              ? '审核通过'
              : h === 3
              ? '审核失败'
              : ''}
          </div>
        )
      }
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      dataIndex: 'id',
      render(id) {
        return (
          <>
            <Space>
              <Tooltip title="修改">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => {
                    history.push(`/home/publish/${id}`)
                  }}
                />
              </Tooltip>
              <Popconfirm
                title="确定要删除该文章吗？"
                onConfirm={() => del(id)}
              >
                <Tooltip title="删除">
                  <Button
                    type="primary"
                    shape="circle"
                    danger
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </Popconfirm>
            </Space>
          </>
        )
      }
    }
  ]
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={Finish} initialValues={{ status: -1 }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择频道" style={{ width: 120 }}>
              {channels.map((item) => {
                return (
                  <Select.Option value={item.id} key={item.id}>
                    {item.name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articles.results}
          pagination={{
            position: ['bottomCenter'],
            total: articles.total_count,
            pageSize: articles.per_page,
            current: articles.page,
            onChange(page, pageSize) {
              paramsRef.current.page = page
              paramsRef.current.per_page = pageSize
              dispatch(getArticleList(paramsRef.current))
            }
          }}
        ></Table>
      </Card>
    </div>
  )
}
