import React, { FC, useEffect, useState } from 'react';

import { Layout, List, Typography } from 'antd';
import { grey } from '@ant-design/colors';
import { useAuth } from '../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';
import { FeedHeader } from '../../components';
import { UserInfo } from '../../models';
import { getUserAccountInfo } from '../../api';

const { Content, Header } = Layout;
const { Text } = Typography;

export const Account: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getToken } = useAuth();
  const [user, setUser] = useState<UserInfo>();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        const user = await getUserAccountInfo(token);
        setUser(user);
      }
    })();
  }, [getToken]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const listData = [
    {
      key: 'Full name:',
      title: user?.fullname,
    },
    {
      key: 'User name:',
      title: user?.username,
    },
    {
      key: 'Email:',
      title: user?.email,
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: grey[2],
        }}
      >
        <FeedHeader user={user} />
      </Header>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '100vh',
          paddingTop: '30px',
          flexDirection: 'column',
        }}
      >
        <List
          itemLayout="horizontal"
          header={<div>Your info</div>}
          bordered
          dataSource={listData}
          style={{
            width: '50%',
          }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Text
                    style={{
                      color: grey[10],
                    }}
                  >
                    {item?.key}
                  </Text>
                }
                description={
                  <Text
                    style={{
                      color: grey[10],
                    }}
                  >
                    {item?.title}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};
