import React, { FC, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Typography, Button, Layout } from 'antd';
import { MAX_NAME_LENGTH, MAX_PASSWORD_LENGTH, MIN_TEXT_LENGTH, MIN_PASSWORD_LENGTH, UserProfile } from '../../models';
import { useAuth } from '../../contexts/auth.context';

const { Text, Link } = Typography;
const { Content } = Layout;

export const Login: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated]);

  const onSubmit = async (userProfile: UserProfile): Promise<void> => {
    await login(userProfile);
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
        <Card style={{ width: 550 }}>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            autoComplete="off"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            form={form}
          >
            <Text style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>Авторизуватися</Text>
            <Form.Item
              label="Ім'я користувача"
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
              <Input placeholder="Ім'я користувача" autoComplete="on" />
            </Form.Item>
            <Form.Item
              label="Пароль"
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
              <Input.Password placeholder="Пароль" autoComplete="on" />
            </Form.Item>
            <Form.Item
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button type="primary" htmlType="submit">
                Авторизуватися
              </Button>
            </Form.Item>
          </Form>
          <Text style={{ display: 'flex', justifyContent: 'center' }}>
            Немає облікового запису?
            <Link
              underline
              style={{
                paddingLeft: '2px',
              }}
              href="/signup"
            >
              Зареєструватися
            </Link>
          </Text>
        </Card>
      </Content>
    </Layout>
  );
};
