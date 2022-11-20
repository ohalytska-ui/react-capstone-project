import React, { FC } from 'react';

import { Card, Typography } from 'antd';
import { Avatar } from 'antd';
// Divider, List, Skeleton
// import InfiniteScroll from 'react-infinite-scroll-component';

const { Text, Title } = Typography;

export const FeedPost: FC = () => {
  return (
    // <InfiniteScroll
    //   dataLength={11} // data.length
    //   next={loadMoreData}
    //   hasMore={data.length < 50}
    //   loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
    //   endMessage={<Divider plain>It is all, nothing more</Divider>}
    //   scrollableTarget="scrollableDiv"
    // ></InfiniteScroll>
    <Card
      style={{
        width: 800,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          style={{
            marginRight: '15px',
          }}
        >
          te
        </Avatar>
        <div>
          <Title level={5}>John Smith</Title>
          <Text>What are the pros of object-oriented programming? Please, explain as if I`&rsquo;`m 5.</Text>
        </div>
      </div>
    </Card>
  );
};
