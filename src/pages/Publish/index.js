import React, { useEffect, useState } from 'react'

import {
  Card,
  Breadcrumb,
  Form,
  Input,
  Select,
  Radio,
  Upload,
  Space,
  Button
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelList } from '@/store/actions'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function Publish(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChannelList())
  }, [dispatch])

  const channels = useSelector((state) => state.article.channelList)

  const [fileList, setFileList] = useState([
    {
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ])
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form size="large" labelCol={{ span: 4 }} initialValues={{}}>
          <Form.Item label="标题" wrapperCol={{ span: 8 }}>
            <Input placeholder="请输入文章的标题"></Input>
          </Form.Item>
          <Form.Item label="频道" wrapperCol={{ span: 4 }} name="type">
            <Select placeholder="请选择频道">
              {channels.map((item) => {
                return (
                  <Select.Option value={item.id} key={item.id}>
                    {item.name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }} style={{ height: 300 }}>
            <ReactQuill style={{ height: 250 }}></ReactQuill>
          </Form.Item>
          <Form.Item label="封面">
            <Radio.Group>
              <Radio value={-1}>自动</Radio>
              <Radio value={0}>无图</Radio>
              <Radio value={1}>1张</Radio>
              <Radio value={3}>3张</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Upload name="cover" listType="picture-card" fileList={fileList}>
              <PlusOutlined></PlusOutlined>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary">发布文章</Button>
              <Button>存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
