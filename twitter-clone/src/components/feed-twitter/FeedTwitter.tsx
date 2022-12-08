import React, { FC, useEffect } from 'react';

import { FeedHeader } from '../feed-header';
import { Layout } from 'antd';
import { grey } from '@ant-design/colors';
import { FeedTextArea } from '../feed-text-area';
import { FeedPost } from '../feed-post';
import { useAuth } from '../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';

const { Content, Header } = Layout;

export const FeedTwitter: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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
        <FeedHeader />
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
        <FeedTextArea />
        <FeedPost />
      </Content>
    </Layout>
  );
};
