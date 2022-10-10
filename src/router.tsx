import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Editor } from './pages/Editor';
import { Canvas } from './features/Canvas';

export function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Editor />}>
          <Route path=":photoId" element={<Canvas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
