import React from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { BallTriangle } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Container, FileInput } from './styled';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AddPhoto(props: Props): JSX.Element {
  const { onChange } = props;
  const loading = useSelector((state: RootState) => state.photo.loading);
  const isLoading = loading === 'pending';

  return (
    <Container isLoading={isLoading}>
      {isLoading ? (
        <BallTriangle
          height={100}
          width={100}
          color="#DCDCDC"
          visible
        />
      ) : (
        <>
          <FileInput type="file" onChange={onChange} />
          <MdAddPhotoAlternate size={36} />
        </>
      )}
    </Container>
  );
}
