import React, { FC, useEffect, useState } from 'react';

import { Button, Card, Divider, List } from 'antd';
import { grey } from '@ant-design/colors';
import { Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Tweet } from '../../models';
import { FeedPostsProps } from './types';
import { deleteUserTweet, getAllUserTweets, updateUserTweet } from '../../api';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { EditModal } from '..';

export const FeedPosts: FC<FeedPostsProps> = ({ user, isLoading, setIsLoading }: FeedPostsProps) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [tweet, setTweet] = useState<Tweet>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadMoreData = async () => {
    if (user?.id) {
      const tweets = await getAllUserTweets(user.id);
      console.log(tweets);
      setTweets(tweets);
    }
  };

  useEffect(() => {
    if (isLoading || user?.id) {
      loadMoreData();
      setIsLoading(false);
    }
  }, [isLoading, user?.id]);

  const showModal = (item: Tweet) => {
    setIsModalOpen(true);
    setTweet(item);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async (tweetId: string, tweetText: string) => {
    updateUserTweet(tweetId, tweetText);
    setIsModalOpen(false);
    loadMoreData();
  };

  return (
    <>
      <Card
        style={{
          width: 800,
        }}
      >
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <InfiniteScroll
            dataLength={tweets.length}
            next={loadMoreData}
            hasMore={tweets.length < 50}
            loader={<></>}
            endMessage={<Divider plain>Це все, більше нічого 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={tweets}
              renderItem={(item) => (
                <List.Item key={item?.id}>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: grey[7] }}>{item?.fullname?.slice(0, 2) ?? ''}</Avatar>}
                    title={item?.fullname}
                    description={<ReactMarkdown rehypePlugins={[rehypeRaw]}>{item?.tweetText}</ReactMarkdown>}
                  />
                  <Button type="text" onClick={() => showModal(item)}>
                    <EditOutlined />
                  </Button>
                  <Button
                    type="text"
                    onClick={() => {
                      deleteUserTweet(item?.id);
                      loadMoreData();
                    }}
                  >
                    <CloseOutlined />
                  </Button>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Card>
      <EditModal
        isModalOpen={isModalOpen}
        tweetText={tweet?.tweetText || ''}
        onCancel={handleCancel}
        onOk={handleOk}
        tweetId={tweet?.id || ''}
      />
    </>
  );
};
