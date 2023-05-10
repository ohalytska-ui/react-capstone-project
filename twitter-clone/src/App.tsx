import React, { FC } from 'react';

import 'antd/dist/reset.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Signup, FeedTwitter, Account } from './pages';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './contexts/auth.context';

const App: FC = () => {
  return (
    <ConfigProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<FeedTwitter />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
