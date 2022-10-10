import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { preparePhoto } from 'store/photos';
import { Sidebar } from './components/Sidebar';
import { Container, CanvasContainer } from './styled';

export function Editor(): JSX.Element {
  const [selectedFile, setSelectedFile] = React.useState<File | null>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (selectedFile) {
      const formData = new FormData();

      formData.append(
        'file',
        selectedFile,
        selectedFile.name,
      );

      dispatch(preparePhoto(formData) as unknown as AnyAction);

      setSelectedFile(null);
    }
  }, [selectedFile]);

  const selectPhoto = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];

    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  return (
    <Container>
      <Sidebar selectPhoto={selectPhoto} />
      <CanvasContainer>
        <Outlet />
      </CanvasContainer>
    </Container>
  );
}
