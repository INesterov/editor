import React from 'react';
import Konva from 'konva';
import { Transformer } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { selectObject, updateImage, Photo } from 'store/photos';
import { URLImage } from '../URLImage';

type Props = {
  src: string;
  image: Photo;
  isCtrlPressed: boolean;
  id: string;
  entitieId: string;
  x: number;
  y: number;
};

export function Object(props: Props): JSX.Element {
  const {
    src,
    image,
    isCtrlPressed,
    id, entitieId,
    x,
    y,
  } = props;
  const dispatch = useDispatch();
  const shapeRef = React.useRef<Konva.Image>(null);
  const trRef = React.useRef<Konva.Transformer>(null);
  const selectedObject = useSelector((state: RootState) => state.photo.selectedObject);
  const isSelected = selectedObject === id;

  React.useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

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

  return (
    <>
      <URLImage
        isSelected={isSelected}
        ref={shapeRef}
        src={src}
        x={x}
        y={y}
        rotation={image.rotation as unknown as number}
        scaleX={image.scaleX as unknown as number}
        scaleY={image.scaleY as unknown as number}
        isHighlight={isCtrlPressed}
        onClick={onSelect}
        onDragEnd={updatePosition}
        globalCompositeOperation="source-over"
        draggable
        id={id}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          borderStrokeWidth={1}
          onTransformEnd={onTransformImage}
          borderStroke="#0052D9"
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}
