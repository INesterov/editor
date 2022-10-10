import React from 'react';
import Konva from 'konva';
import { Image, StageProps } from 'react-konva';

type Props = {
  src: string;
  isHighlight?: boolean;
  x: number;
  y: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  onClick?: () => void;
  onContextMenu?: (evt: Konva.KonvaEventObject<PointerEvent>) => void;
  onDragEnd?: (evt: Konva.KonvaEventObject<DragEvent>) => void;
  onTransformEnd?: (evt: Konva.KonvaEventObject<Event>) => void;
  isSelected?: boolean;
  globalCompositeOperation?: StageProps['globalCompositeOperation'];
  draggable?: boolean;
  id?: string;
};

export const URLImage = React.forwardRef<Konva.Image, Props>((props, imageRef): JSX.Element => {
  const [image, setImage] = React.useState<HTMLImageElement>();
  const bgRef = React.useRef({ x: 0, y: 0 });
  const {
    src,
    x,
    y,
    isHighlight,
    onClick,
    isSelected,
    onDragEnd,
    onTransformEnd,
    globalCompositeOperation,
    draggable,
    id,
    rotation,
    scaleX,
    scaleY,
    onContextMenu,
  } = props;

  const handleLoad = React.useCallback((e: Event) => {
    if (e.target) {
      setImage(e.target as HTMLImageElement);
    }
  }, []);

  React.useEffect(() => {
    const img = new window.Image();

    img.src = src;

    img.addEventListener('load', handleLoad);

    if (bgRef.current.x === 0 && bgRef.current.y === 0) {
      bgRef.current.x = x;
      bgRef.current.y = y;
    }

    return () => {
      img.removeEventListener('load', handleLoad);
    };
  }, [src]);

  return (
    <Image
      x={x}
      y={y}
      image={image}
      stroke={isHighlight ? 'yellow' : 'transparent'}
      ref={imageRef}
      onClick={onClick}
      draggable={draggable && isSelected}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
      globalCompositeOperation={globalCompositeOperation}
      id={id}
      name={id}
      rotation={rotation}
      scaleX={scaleX}
      scaleY={scaleY}
      onContextMenu={onContextMenu}
    />
  );
});
