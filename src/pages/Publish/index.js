import React, { useEffect, useRef, useState } from 'react'

import {
  Card,
  Breadcrumb,
  Form,
  Input,
  Select,
  Radio,
  Upload,
  Space,
  Button,
  message,
  Modal
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  editArticle,
  getArticleInfo,
  getChannelList,
  saveArticle,
  saveDraft
} from '@/store/actions'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import history from '@/utils/history'
import { useParams } from 'react-router-dom'

export default function Publish(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChannelList())
  }, [dispatch])

  const channels = useSelector((state) => state.article.channelList)

  const [fileList, setFileList] = useState([])
  const onChange = ({ fileList }) => {
    setFileList(fileList)
    fileRef.current = fileList
    formRef.current.validateFields(['type'])
  }
  const onFinish = (value) => {
    const data = {
      ...value,
      cover: {
        type,
        images: fileRef.current.map((item) => {
          return item.response ? item.response.data.url : item.url
        })
      }
    }

    if (!id) {
      dispatch(saveArticle(data))
    } else {
      dispatch(editArticle(false, { ...data, id }))
    }
    message.success('操作成功')
    history.push('/home/article')
  }
  // 控制图数量
  const [type, setType] = useState(0)

  const onTypeChange = (e) => {
    const count = e.target.value
    setType(count)
    setFileList(fileRef.current.slice(0, count))
  }

  // 存储已上传图片的ref
  const fileRef = useRef(fileList)

  // 表单控件的ref
  const formRef = useRef(null)

  // 存入草稿
  const addDraft = async () => {
    let values = await formRef.current.validateFields()
    delete values.type
    const data = {
      ...values,
      cover: {
        type,
        images: fileRef.current.map((item) => item.response.data.url)
      }
    }
    dispatch(saveDraft(data))
    message.success('存入草稿成功')
    history.push('/home/article')
  }

  // 图片预览功能
  const [isVisible, setIsVisible] = useState(false)
  const [preview, setPreview] = useState('')
  const onPreview = (file) => {
    setIsVisible(true)
    setPreview(file.url || file.response.data.url)
  }

  // 修改功能
  // 查看是否有文章id, 有的话就是修改,没有的话就是新增
  const { id } = useParams()

  useEffect(() => {
    if (!id) return
    // 如果有id,代表是修改
    dispatch(getArticleInfo(id)).then((res) => {
      // 表单的回显
      formRef.current.setFieldsValue({
        ...res,
        type: res.cover.type
      })
      // 图片的回显
      setType(res.cover.type)
      const list = res.cover.images.map((item) => {
        return {
          url: item
        }
      })
      setFileList(list)
      fileRef.current = list
      console.log(list)
    })
  }, [id, dispatch])
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
        <Form
          size="large"
          labelCol={{ span: 4 }}
          initialValues={{
            content: '',
            type: 0
          }}
          onFinish={onFinish}
          ref={formRef}
          validateTrigger={['onBlur', 'onChange']}
        >
          <Form.Item
            label="标题"
            wrapperCol={{ span: 8 }}
            name="title"
            rules={[
              {
                required: true,
                message: '标题不能为空'
              }
            ]}
          >
            <Input placeholder="请输入文章的标题"></Input>
          </Form.Item>
          <Form.Item
            label="频道"
            wrapperCol={{ span: 4 }}
            name="channel_id"
            rules={[
              {
                required: true,
                message: '频道不能为空'
              }
            ]}
          >
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
          <Form.Item
            wrapperCol={{ offset: 4 }}
            style={{ height: 300 }}
            name="content"
            rules={[
              {
                required: true,
                message: '内容不能为空'
              }
            ]}
          >
            <ReactQuill style={{ height: 250 }}></ReactQuill>
          </Form.Item>
          <Form.Item
            label="封面"
            name="type"
            rules={[
              {
                validator(_, value) {
                  if (fileList.length !== value) {
                    return Promise.reject(new Error(`请上传${value}张照片`))
                  } else {
                    return Promise.resolve()
                  }
                }
              }
            ]}
          >
            <Radio.Group onChange={onTypeChange}>
              <Radio value={0}>无图</Radio>
              <Radio value={1}>1张</Radio>
              <Radio value={3}>3张</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              action="http://geek.itheima.net/v1_0/upload"
              onChange={onChange}
              name="image"
              maxCount={type}
              onPreview={onPreview}
            >
              {fileList.length < type && <PlusOutlined></PlusOutlined>}
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {id ? '编辑' : '发布'}
              </Button>
              {id ? <></> : <Button onClick={addDraft}>存入草稿</Button>}
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        width={800}
        title="图片预览"
        visible={isVisible}
        onOk={() => {
          setIsVisible(false)
        }}
        onCancel={() => {
          setIsVisible(false)
        }}
      >
        <img src={preview} alt="" style={{ width: 600 }} />
      </Modal>
    </div>
  )
}
