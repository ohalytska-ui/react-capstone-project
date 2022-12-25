import React, { FC, useEffect, useState } from 'react';

import { Layout } from 'antd';
import { grey } from '@ant-design/colors';
import { useAuth } from '../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';
import { FeedPosts, FeedTextArea, FeedHeader } from '../../components';
import { UserInfo } from '../../models';
import { getUserAccountInfo } from '../../api';

const { Content, Header } = Layout;

export const FeedTwitter: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getToken } = useAuth();
  const [user, setUser] = useState<UserInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        <FeedTextArea user={user} setIsLoading={setIsLoading} />
        <FeedPosts user={user} isLoading={isLoading} setIsLoading={setIsLoading} />
      </Content>
    </Layout>
  );
};
