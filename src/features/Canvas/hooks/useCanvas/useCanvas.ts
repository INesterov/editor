import React from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteImage,
  cancelAction,
  copyImage,
  cutImage,
  pustImage,
} from 'store/photos';

export function useCanvas() {
  const dispatch = useDispatch();
  const [isCtrlPress, setCtrlPress] = React.useState(false);

  const onKeyPress = React.useCallback((evt: KeyboardEvent) => {
    if (evt.code === 'Delete') {
      dispatch(deleteImage());
    }

    if (evt.ctrlKey && evt.code === 'KeyZ') {
      dispatch(cancelAction());
    }
  }, [deleteImage, cancelAction]);

  const onKeyDown = React.useCallback((evt: KeyboardEvent) => {
    setCtrlPress(true);

    if (evt.ctrlKey && evt.code === 'KeyC') {
      dispatch(copyImage());
    }

    if (evt.ctrlKey && evt.code === 'KeyX') {
      dispatch(cutImage());
    }

    if (evt.ctrlKey && evt.code === 'KeyV') {
      dispatch(pustImage());
    }
  }, [setCtrlPress]);

  const onKeyUp = React.useCallback(() => {
    setCtrlPress(false);
  }, [setCtrlPress]);

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
    isCtrlPress,
  };
}
