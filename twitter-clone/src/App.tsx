import React, { FC } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Signup, FeedTwitter } from './pages';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './contexts/auth.context';

import 'antd/dist/reset.css';

const App: FC = () => {
  return (
    <ConfigProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<FeedTwitter />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
