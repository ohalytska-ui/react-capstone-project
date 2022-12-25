import React, { FC } from 'react';

import { Avatar, Button, Dropdown, List, MenuProps, Typography } from 'antd';
import { grey } from '@ant-design/colors';
import { TwitterOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/auth.context';
import { FeedHeaderProps } from './types';

const { Text } = Typography;

export const FeedHeader: FC<FeedHeaderProps> = ({ user }: FeedHeaderProps) => {
  const { logout } = useAuth();

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <Button type="text" onClick={() => logout()}>
          Log out
        </Button>
      ),
    },
  ];

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
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <div className="feed-header-user-icon">
              <Text
                style={{
                  color: grey[10],
                  paddingRight: '15px',
                }}
              >
                {user?.fullname}
              </Text>
              <Avatar style={{ backgroundColor: grey[7] }}>{user?.fullname?.slice(0, 2) ?? ''}</Avatar>
            </div>
          </a>
        </Dropdown>
      </List.Item>
    </List>
  );
};
