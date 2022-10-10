import React from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineSaveAlt, MdOutlineFlipCameraIos } from 'react-icons/md';
import { Portal } from 'uikit';
import { RootState } from 'store';
import { useContextMenu } from './hooks/useContextMenu';
import { MenuItem } from './components/MenuItem';
import { Container } from './styled';

type Props = {
  onSaveObject?: () => void;
};

export function ContectMenu(props: Props): JSX.Element | null {
  const { onSaveObject } = props;
  const isOpen = useSelector((state: RootState) => state.contextMenu.isOpen);
  const x = useSelector((state: RootState) => state.contextMenu.x);
  const y = useSelector((state: RootState) => state.contextMenu.y);
  const selectedObject = useSelector((state: RootState) => state.photo.selectedObject);
  const {
    save,
    onMirroriging,
  } = useContextMenu({ onSaveObject });

  return isOpen ? (
    <Portal>
      <Container x={x} y={y}>
        <MenuItem onClick={save} title="Сохранить" icon={<MdOutlineSaveAlt size={24} fill="#2D3436" />} />
        {selectedObject && (
          <MenuItem onClick={onMirroriging} title="Зеркалить" icon={<MdOutlineFlipCameraIos size={24} fill="#2D3436" />} />
        )}
      </Container>
    </Portal>
  ) : null;
}
