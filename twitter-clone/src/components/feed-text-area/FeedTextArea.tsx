import React, { FC } from 'react';

import { MAX_TEXT_LENGTH, MIN_TEXT_LENGTH, Post, Tweet } from '../../models';
import { Button, Form, Input } from 'antd';
import { FeedTextAreaProps } from './types';
import { createNewUserTweet } from '../../api';

export const FeedTextArea: FC<FeedTextAreaProps> = ({ user, setIsLoading }: FeedTextAreaProps) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onSubmit = async (tweetInfo: Post) => {
    const newTweet: Tweet = {
      tweetText: tweetInfo.text,
      userId: user?.id,
      fullname: user?.fullname,
    };
    createNewUserTweet(newTweet);
    setIsLoading(true);
    onReset();
  };

  return (
    <Form name="signup" initialValues={{ remember: true }} onFinish={onSubmit} autoComplete="off" form={form}>
      <Form.Item
        name={'text'}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        rules={[{ required: true, message: 'Invalid text!', max: MAX_TEXT_LENGTH, min: MIN_TEXT_LENGTH }]}
      >
        <Input.TextArea
          name="text"
          rows={6}
          placeholder="What’s happening?"
          maxLength={MAX_TEXT_LENGTH}
          minLength={MIN_TEXT_LENGTH}
          style={{ width: 800 }}
        />
      </Form.Item>
      <Form.Item
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button type="primary" htmlType="submit">
          Tweet
        </Button>
      </Form.Item>
    </Form>
  );
};
