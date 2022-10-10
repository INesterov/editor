import React from 'react';
import Konva from 'konva';
import { openMenu } from 'store/contextMenu';
import { useDispatch } from 'react-redux';
import { selectObject, updateImage, Photo } from 'store/photos';

type Options = {
  image: Photo;
  entitieId: string;
  isCtrlPressed: boolean;
  id: string;
};

export function useObject(options: Options) {
  const {
    image,
    entitieId,
    isCtrlPressed,
    id,
  } = options;
  const dispatch = useDispatch();

  const updatePosition = React.useCallback((evt: Konva.KonvaEventObject<DragEvent>) => {
    const { attrs } = evt.target.toObject();
    const imageProps = attrs as Photo;

    dispatch(updateImage({
      ...image,
      x: imageProps.x,
      y: imageProps.y,
    }));
  }, [updateImage, entitieId, image]);

  const onSelect = React.useCallback(() => {
    if (isCtrlPressed) {
      dispatch(selectObject(id));
    }
  }, [selectObject, isCtrlPressed, id]);

  const onTransformImage = React.useCallback((evt: Konva.KonvaEventObject<Event>) => {
    const { attrs } = evt.target.toObject();
    const imageProps = attrs as Photo;

    dispatch(updateImage({
      ...image,
      x: imageProps.x,
      y: imageProps.y,
      scaleX: imageProps.scaleX,
      scaleY: imageProps.scaleY,
      rotation: imageProps.rotation,
    }));
  }, [updateImage, image]);

  const onDbClick = React.useCallback((evt: Konva.KonvaEventObject<PointerEvent>) => {
    evt.evt.preventDefault();

    const { x, y } = evt.evt;

    dispatch(openMenu({ x, y }));
  }, [openMenu]);

  return {
    updatePosition,
    onSelect,
    onTransformImage,
    onDbClick,
  };
}
