import React, { FC, useEffect } from 'react';

import { Card, Form, Input, Typography, Button, Layout } from 'antd';
import { UserInfo, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, MAX_NAME_LENGTH, MIN_TEXT_LENGTH } from '../../models';
import { emailRegExp } from '../../utils';
import { useAuth } from '../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';

const { Text, Link } = Typography;
const { Content } = Layout;

export const Signup: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { registration, isAuthenticated } = useAuth();

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated]);

  const onSubmit = async (newUser: UserInfo): Promise<void> => {
    await registration(newUser);
    onReset();
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
            name="signup"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            autoComplete="off"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            form={form}
          >
            <Text style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>Зареєструватися</Text>
            <Form.Item
              label="Повне ім'я"
              name="fullname"
              rules={[{ required: true, message: 'Invalid full name!', max: MAX_NAME_LENGTH, min: MIN_TEXT_LENGTH }]}
            >
              <Input placeholder="Повне ім'я" autoComplete="on" />
            </Form.Item>
            <Form.Item
              label="Ім'я користувача"
              name="username"
              rules={[{ required: true, message: 'Invalid username!', max: MAX_NAME_LENGTH, min: MIN_TEXT_LENGTH }]}
            >
              <Input placeholder="Ім'я користувача" autoComplete="on" />
            </Form.Item>
            <Form.Item
              label="Електронна пошта"
              name="email"
              rules={[{ required: true, message: 'Invalid email!', pattern: emailRegExp, max: MAX_NAME_LENGTH }]}
            >
              <Input placeholder="Електронна пошта" autoComplete="on" />
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
                Зареєструватися
              </Button>
            </Form.Item>
          </Form>
          <Text style={{ display: 'flex', justifyContent: 'center' }}>
            Вже є аккаунт?
            <Link
              underline
              style={{
                paddingLeft: '2px',
              }}
              href="/"
            >
              Авторизуватися
            </Link>
          </Text>
        </Card>
      </Content>
    </Layout>
  );
};
