import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { MasterPage } from "./Pages/Masterpage.jsx";
import "./index.scss";
import { Details } from "./Pages/Details.jsx";
import { EditPage } from "./Pages/Edit.jsx";
import { AddPage } from "./Pages/Add.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterPage />,
  },
  {
    path: "/:id",
    element: <Details />,
  },
  {
    path: "/edit/:id",
    element: <EditPage />,
  },
  {
    path: "/add",
    element: <AddPage />
  
  }
]);

const App = () => (
  <RouterProvider router={router}/>
)

ReactDOM.render(<App />, document.getElementById("app"));
  