import React from 'react';
import { Stage, Layer } from 'react-konva';
import useImage from 'use-image';
import { useParams, Navigate } from 'react-router-dom';
import {
  useSelector,
  useDispatch,
  ReactReduxContext,
  Provider,
} from 'react-redux';
import { RootState } from 'store';
import { setActivePhoto } from 'store/photos';
import { ContectMenu } from '../ContextMenu';
import { useCanvas } from './hooks/useCanvas';
import { URLImage } from './components/URLImage';
import { Object } from './components/Object';
import { CanvasWrapper } from './styled';

export function Canvas(): JSX.Element {
  const params = useParams();
  const { photoId } = params;
  const entity = useSelector((state: RootState) => state.photo.entities[photoId as string]);
  const dispatch = useDispatch();
  const [photo] = useImage(entity?.originalImg);
  const {
    canvasRef,
    isCtrlPress,
    onClickOriginalPhoto,
    onDbClick,
    onSaveObject,
  } = useCanvas();

  React.useEffect(() => {
    if (photoId) {
      dispatch(setActivePhoto(photoId));
    }
  }, [photoId, setActivePhoto]);

  React.useEffect(() => {
    if (canvasRef.current && photo) {
      canvasRef.current.width(photo.width);
      canvasRef.current.height(photo.height);
    }
  }, [photoId, canvasRef, photo]);

  return !entity ? (
    <Navigate to="/" replace />
  ) : (
    <CanvasWrapper isCtrlPressed={isCtrlPress}>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage ref={canvasRef} width={500} height={500}>
            <Provider store={store}>
              <Layer>
                <URLImage onContextMenu={onDbClick} onClick={onClickOriginalPhoto} src={entity?.originalImg ?? ''} x={0} y={0} />
                {entity?.masks?.map((mask) => (
                  <URLImage
                    key={mask.id}
                    x={Number(mask.x) - 10}
                    y={Number(mask.y) - 10}
                    src={mask.src}
                    draggable={false}
                    globalCompositeOperation="xor"
                  />
                ))}
                {entity?.images?.map((image) => (
                  <Object
                    entitieId={photoId as string}
                    key={image.id}
                    id={image.id}
                    src={image.src}
                    image={image}
                    x={Number(image.x) - 10}
                    y={Number(image.y) - 10}
                    isCtrlPressed={isCtrlPress}
                  />
                ))}
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
      <ContectMenu onSaveObject={onSaveObject} />
    </CanvasWrapper>
  );
}
