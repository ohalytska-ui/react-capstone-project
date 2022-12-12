import React, { FC, useEffect, useState } from 'react';

import { Avatar, Button, Dropdown, List, MenuProps, Typography } from 'antd';
import { grey } from '@ant-design/colors';
import { TwitterOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/auth.context';
import { UserInfo } from '../../models';
import { getUserAccountInfo } from '../../api';

const { Text } = Typography;

export const FeedHeader: FC = () => {
  const { getToken, logout } = useAuth();
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

  const items: MenuProps['items'] = [
    {
      key: '1',
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
