import React, { useState } from 'react'

import styles from './index.module.scss'
import logo from '@/assets/img/logo.svg'

import { Form, Input, Button, Checkbox, message, Card } from 'antd'
import { useDispatch } from 'react-redux'

import { loginAction } from '@/store/actions'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Login() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const onFinish = async (values) => {
    setLoading(true)
    const { account, code } = values
    try {
      await dispatch(
        loginAction({
          mobile: account,
          code: code
        })
      )
      message.success('登录成功', 1)
      history.push('/home')
    } catch (err) {
      setLoading(false)
      message.error(err.response.data.message, 1)
    }
  }
  return (
    <>
      <div className={styles.root}>
        <div className="login-container">
          <Card>
            <img src={logo} alt="" className="login-logo" />
            <Form
              name="basic"
              autoComplete="off"
              initialValues={{
                account: '13911111111',
                code: '246810',
                agree: true
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="手机号"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="account"
                rules={[
                  { required: true, message: '手机号不能为空' },
                  { pattern: /^1\d{10}$/, message: '格式不正确' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="验证码"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="code"
                rules={[
                  { required: true, message: '验证码不能为空' },
                  { pattern: /^\d{6}$/, message: '格式不正确' }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    validator: (_, value) => {
                      if (value === true) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject(new Error('请同意用户协议'))
                      }
                    }
                  }
                ]}
                name="agree"
                valuePropName="checked"
              >
                <Checkbox>是否同意用户协议</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
                  点击登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  )
}
