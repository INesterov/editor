import React from 'react';
import Konva from 'konva';
import { useDispatch, useSelector } from 'react-redux';
import {
  deselectObject,
} from 'store/photos';
import { RootState } from 'store';
import { downloadURI } from 'helpers/downloadURI';
import { openMenu, closeMenu } from 'store/contextMenu';
import { useOneKey } from './useOnKey';

export function useCanvas() {
  const dispatch = useDispatch();
  const canvasRef = React.useRef<Konva.Stage>(null);
  const selectedObject = useSelector((state: RootState) => state.photo.selectedObject);
  const {
    isCtrlPress,
    onKeyPress,
    onKeyDown,
    onKeyUp,
  } = useOneKey();

  const onClickOriginalPhoto = React.useCallback(() => {
    dispatch(deselectObject());
    dispatch(closeMenu());
  }, [deselectObject]);

  const onDbClick = React.useCallback((evt: Konva.KonvaEventObject<PointerEvent>) => {
    evt.evt.preventDefault();

    const { x, y } = evt.evt;

    dispatch(openMenu({ x, y }));
  }, [openMenu]);

  const onSaveObject = React.useCallback(() => {
    if (!canvasRef.current) return;

    const image = canvasRef.current.findOne(`#${selectedObject}`);
    const imageData = image.toDataURL();

    downloadURI(imageData, selectedObject);
    dispatch(closeMenu());
  }, [canvasRef.current, selectedObject, downloadURI, closeMenu]);

  React.useEffect(() => {
    document.addEventListener('keypress', onKeyPress);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keypress', onKeyPress);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return {
    canvasRef,
    isCtrlPress,
    onClickOriginalPhoto,
    onDbClick,
    onSaveObject,
  };
}
