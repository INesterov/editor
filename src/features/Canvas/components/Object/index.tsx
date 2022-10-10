import React from 'react';
import Konva from 'konva';
import { Transformer } from 'react-konva';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Photo } from 'store/photos';
import { URLImage } from '../URLImage';
import { useObject } from './hooks/useObject';

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
    id,
    entitieId,
    x,
    y,
  } = props;
  const shapeRef = React.useRef<Konva.Image>(null);
  const trRef = React.useRef<Konva.Transformer>(null);
  const selectedObject = useSelector((state: RootState) => state.photo.selectedObject);
  const isSelected = selectedObject === id;
  const {
    updatePosition,
    onSelect,
    onTransformImage,
    onDbClick,
  } = useObject({
    image,
    entitieId,
    isCtrlPressed,
    id,
  });

  React.useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

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
        onContextMenu={onDbClick}
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
