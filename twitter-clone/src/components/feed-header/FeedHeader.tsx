import React, { FC } from 'react';

import { Avatar, List, Typography } from 'antd';
import { grey } from '@ant-design/colors';
import { TwitterOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const FeedHeader: FC = () => {
  return (
    <List
      style={{
        width: '100%',
      }}
    >
      <List.Item>
        <div className="feed-header-title">
          <TwitterOutlined />
          <Text
            style={{
              color: grey[10],
              paddingLeft: '15px',
            }}
          >
            Another Twitter Clone
          </Text>
        </div>
        <div className="feed-header-user-icon">
          <Text
            style={{
              color: grey[10],
              paddingRight: '15px',
            }}
          >
            John Smith
          </Text>
          <Avatar style={{ backgroundColor: grey[7] }}>JS</Avatar>
        </div>
      </List.Item>
    </List>
  );
};
