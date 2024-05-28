import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { MasterPage } from "./Pages/MasterPage.jsx";
import { Login } from "./Pages/Login.jsx";
import { Register } from "./Pages/Register.jsx";
import "./index.scss";
import { Details } from "./Pages/Details.jsx";
import { EditPage } from "./Pages/Edit.jsx";
import { AddPage } from "./Pages/Add.jsx";
import { AddTask } from "./Pages/AddTask.jsx";
import { GlobalStateProvider } from "./GlobalState";
import { AuthProvider } from "./AuthProvider";
import { PrivateRoute } from "./PrivateRoute";
import UserDetails from "./Pages/UserDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<MasterPage />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/:id",
    element: <PrivateRoute element={<Details />} />,
  },
  {
    path: "/edit/:id",
    element: <PrivateRoute element={<EditPage />} />,
  },
  {
    path: "/add",
    element: <PrivateRoute element={<AddPage />} />
  },
  {
    path: "/addtask",
    element: <PrivateRoute element={<AddTask />} />
  },
  {
    path: "/user-details",
    element: <PrivateRoute element={<UserDetails />} />
  }
]);

const App = () => (
  <AuthProvider>
    <GlobalStateProvider>
      <RouterProvider router={router}/>
    </GlobalStateProvider>
  </AuthProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
