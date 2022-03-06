import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

import Routes from './routes';

export default function App() {
  return <Routes />;
}
