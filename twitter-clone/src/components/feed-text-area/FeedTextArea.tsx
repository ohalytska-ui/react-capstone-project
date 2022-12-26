import React, { FC, useState } from 'react';

import { MAX_TEXT_LENGTH, MIN_TEXT_LENGTH, Post, Tweet } from '../../models';
import { Button, Form } from 'antd';
import { FeedTextAreaProps } from './types';
import { createNewUserTweet } from '../../api';
import ReactQuill from 'react-quill';

export const FeedTextArea: FC<FeedTextAreaProps> = ({ user, setIsLoading }: FeedTextAreaProps) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');

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

  console.log('value', value);

  return (
    <Form name="signup" initialValues={{ remember: true }} onFinish={onSubmit} autoComplete="off" form={form}>
      <Form.Item
        name={'text'}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        rules={[{ required: true, message: 'Invalid text!', max: MAX_TEXT_LENGTH, min: MIN_TEXT_LENGTH }]}
      >
        <ReactQuill theme="snow" value={value} onChange={setValue} />
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
