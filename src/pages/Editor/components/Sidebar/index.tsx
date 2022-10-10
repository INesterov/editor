import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Photo } from '../Photo';
import { AddPhoto } from '../AddPhoto';
import { StyledSidebar } from './styled';

type Props = {
  selectPhoto: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Sidebar(props: Props): JSX.Element {
  const { selectPhoto } = props;
  const entities = useSelector((state: RootState) => state.photo.entities);
  const photos = Object.values(entities);

  return (
    <StyledSidebar>
      {photos.map((photo) => (
        <Photo
          key={photo.id}
          id={photo.id}
          src={photo.originalImg}
        />
      ))}
      <AddPhoto onChange={selectPhoto} />
    </StyledSidebar>
  );
}
