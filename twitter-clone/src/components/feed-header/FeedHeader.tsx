import React, { FC } from 'react';

import { Avatar, Button, Dropdown, List, MenuProps, Typography } from 'antd';
import { grey } from '@ant-design/colors';
import { useAuth } from '../../contexts/auth.context';
import { FeedHeaderProps } from './types';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export const FeedHeader: FC<FeedHeaderProps> = ({ user }: FeedHeaderProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <Button type="text" onClick={() => logout()}>
          Вийти
        </Button>
      ),
    },
    {
      key: 'my-account',
      label: (
        <Button type="text" onClick={() => navigate('/account')}>
          Моя інформація
        </Button>
      ),
    },
    {
      key: 'profile',
      label: (
        <Button type="text" onClick={() => navigate('/profile')}>
          Профіль
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
          <Text
            style={{
              color: grey[10],
              paddingLeft: '15px',
            }}
          >
            Лого
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
