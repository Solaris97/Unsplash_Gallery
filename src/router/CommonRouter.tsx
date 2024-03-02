import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainPage from "@pages/MainPage";
import BookMarkPage from "@pages/BookMarkPage";
import ErrorPage from "@pages/ErrorPage";
const CommonRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/mainpage" />}></Route>
      <Route path="/mainpage" element={<MainPage />}></Route>
      <Route path="/bookmarkpage" element={<BookMarkPage />}></Route>
      <Route path="/errorpage" element={<ErrorPage />}></Route>
    </Routes>
  );
};

export default CommonRouter;
