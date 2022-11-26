import React, { FC } from 'react';

import 'antd/dist/reset.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Signup, FeedTwitter } from './components';
import { ConfigProvider } from 'antd';

const App: FC = () => {
  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<FeedTwitter />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </ConfigProvider>
  );
};

export default App;
