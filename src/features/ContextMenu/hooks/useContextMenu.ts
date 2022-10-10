import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { closeMenu } from 'store/contextMenu';
import { mirroriging } from 'store/photos';
import { downloadURI } from 'helpers/downloadURI';

type Options = {
  onSaveObject?: () => void;
};

export function useContextMenu(options: Options) {
  const {
    onSaveObject,
  } = options;
  const selectedObject = useSelector((state: RootState) => state.photo.selectedObject);
  const activePhoto = useSelector((state: RootState) => state.photo.activePhoto);
  const dispatch = useDispatch();

  const save = React.useCallback(() => {
    if (!selectedObject) {
      const image = document.querySelector('canvas').toDataURL();

      downloadURI(image, activePhoto);
    } else if (onSaveObject) {
      onSaveObject();
    }
  }, [activePhoto, downloadURI, selectedObject, closeMenu]);

  const onMirroriging = React.useCallback(() => {
    if (!selectedObject) return;

    dispatch(mirroriging());
    dispatch(closeMenu());
  }, [selectedObject, mirroriging]);

  return {
    save,
    onMirroriging,
  };
}
