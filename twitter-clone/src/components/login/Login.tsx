import React, { FC } from 'react';

import { Card, Form, Input, Typography, Button, Layout } from 'antd';
import { MAX_NAME_LENGTH, MAX_PASSWORD_LENGTH, MIN_TEXT_LENGTH, MIN_PASSWORD_LENGTH, UserProfile } from '../../models';

const { Text, Link } = Typography;
const { Content } = Layout;

export const Login: FC = () => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onSubmit = (values: UserProfile) => {
    console.log('Success:', values);
    onReset();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Card style={{ width: 400 }}>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            form={form}
          >
            <Text style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>Log in</Text>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Invalid username!',
                  max: MAX_NAME_LENGTH,
                  min: MIN_TEXT_LENGTH,
                },
              ]}
            >
              <Input placeholder="Username" autoComplete="on" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Invalid password!',
                  max: MAX_PASSWORD_LENGTH,
                  min: MIN_PASSWORD_LENGTH,
                },
              ]}
            >
              <Input.Password placeholder="Password" autoComplete="on" />
            </Form.Item>
            <Form.Item
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
          <Text style={{ display: 'flex', justifyContent: 'center' }}>
            Don’t have an account?
            <Link
              underline
              style={{
                paddingLeft: '2px',
              }}
              href="/signup"
            >
              Sign up
            </Link>
          </Text>
        </Card>
      </Content>
    </Layout>
  );
};
