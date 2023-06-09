import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { EditModalProps } from './types';
import { MAX_TEXT_LENGTH, MIN_TEXT_LENGTH } from '../../models';
import TextArea from 'antd/es/input/TextArea';

export const EditModal: FC<EditModalProps> = ({ isModalOpen, tweetText, tweetId, onCancel, onOk }: EditModalProps) => {
  const [value, setValue] = useState(tweetText ?? '');

  useEffect(() => {
    if (tweetText) {
      setValue(tweetText);
    }
  }, [tweetText]);

  return (
    <Modal title="Text edit" open={isModalOpen} onOk={() => onOk(tweetId, value)} onCancel={onCancel}>
      <TextArea
        rows={4}
        placeholder="Відредагуйте ваше повідомлення..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        minLength={MIN_TEXT_LENGTH}
        maxLength={MAX_TEXT_LENGTH}
      />
    </Modal>
  );
};
