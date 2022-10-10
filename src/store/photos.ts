import axios from 'axios';
import { nanoid } from 'nanoid';
import { cloneDeep } from 'lodash';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const preparePhoto = createAsyncThunk(
  'prepare_photo',
  async (photo: FormData) => {
    const response = await axios.post('api/prepare_image', photo);

    return response.data;
  },
);

export type Photo = {
  src: string;
  id: string;
  x: number;
  y: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
};

type PhotoState = {
  entities: {
    [key: string]: {
      id: string;
      originalImg: string;
      images: Photo[];
      masks: Photo[];
    }
  },
  selectedObject: string;
  activePhoto: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  stack: Photo[];
  buffer?: Photo;
};

const initialState = {
  entities: {},
  loading: 'idle',
  selectedObject: 'null',
  stack: [],
  activePhoto: '',
  buffer: undefined,
} as PhotoState;

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setActivePhoto: (state, action: PayloadAction<string>) => {
      state.activePhoto = action.payload;
    },
    copyImage: (state) => {
      const image = state.entities[state.activePhoto].images.find(
        (img) => img.id === state.selectedObject,
      );

      state.buffer = image;
    },
    cutImage: (state) => {
      const image = state.entities[state.activePhoto].images.find(
        (img) => img.id === state.selectedObject,
      );
      const newImages = state.entities[state.activePhoto].images.filter(
        (img) => img.id !== state.selectedObject,
      );

      state.entities[state.activePhoto].images = newImages;
      state.buffer = image;
    },
    pustImage: (state) => {
      const image = { ...state.buffer, id: nanoid() };

      state.entities[state.activePhoto].images = [
        ...state.entities[state.activePhoto].images,
        image as Photo,
      ];
    },
    selectObject: (state, action: PayloadAction<string>) => {
      state.selectedObject = action.payload;
    },
    deselectObject: (state) => {
      state.selectedObject = '';
    },
    cancelAction: (state) => {
      const stack = cloneDeep(state.stack);
      const stackedImage = stack.pop();

      if (stackedImage) {
        const newImages = state.entities[state.activePhoto].images.map((image) => {
          if (image.id === stackedImage.id) {
            return stackedImage;
          }

          return image;
        });

        state.stack = stack;
        state.entities[state.activePhoto].images = newImages;
      }
    },
    updateImage: (state, action: PayloadAction<Photo>) => {
      const {
        x,
        y,
        scaleX,
        scaleY,
        rotation,
      } = action.payload;
      const { activePhoto } = state;
      const prevImage = state.entities[activePhoto].images.find(
        (image) => image.id === state.selectedObject,
      ) as Photo;

      state.stack = [...state.stack, prevImage];

      const newImages = state.entities[activePhoto].images.map((image) => {
        if (image.id === state.selectedObject) {
          return {
            ...image,
            x,
            y,
            scaleX,
            scaleY,
            rotation,
          };
        }

        return image;
      }) as Photo[];

      state.entities[activePhoto].images = newImages;
    },
    deleteImage: (state) => {
      const prevImage = state.entities[state.activePhoto].images.find(
        (image) => image.id === state.selectedObject,
      ) as Photo;
      const newImages = state.entities[state.activePhoto].images.filter(
        (image) => image.id !== state.selectedObject,
      );

      state.stack = [...state.stack, prevImage];

      state.entities[state.activePhoto].images = newImages;
    },
    mirroriging: (state) => {
      const prevImage = state.entities[state.activePhoto].images.find(
        (image) => image.id === state.selectedObject,
      ) as Photo;

      state.stack = [...state.stack, prevImage];

      const newImage = cloneDeep(prevImage);

      newImage.scaleX = -(newImage?.scaleX ?? 1);

      const newImages = state.entities[state.activePhoto].images.map((image) => {
        if (image.id === newImage.id) {
          return newImage;
        }

        return image;
      });

      state.entities[state.activePhoto].images = newImages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(preparePhoto.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(preparePhoto.fulfilled, (state, action) => {
        const { uid, original, images } = action.payload;

        state.entities[uid] = {
          id: uid,
          originalImg: original,
          images,
          masks: images,
        };

        state.loading = 'idle';
      });
  },
});

export const {
  selectObject,
  deselectObject,
  updateImage,
  deleteImage,
  setActivePhoto,
  cancelAction,
  copyImage,
  cutImage,
  pustImage,
  mirroriging,
} = photosSlice.actions;
