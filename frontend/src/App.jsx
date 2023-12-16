import React from 'react';

import {
  createMemoryRouter,
  RouterProvider,
} from "react-router-native";

import Login from './Login';
import Channels from './Channels';
import Messages from './Messages';

const router = createMemoryRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/channels",
    element: <Channels />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
