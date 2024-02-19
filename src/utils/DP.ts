import {useWindowDimensions, PixelRatio} from 'react-native';

//   const windowDimensions = useWindowDimensions();
const {height, width} = useWindowDimensions();

// Calculate height and width in dp
export const heightInDp = (heightPercentage: number) =>
  PixelRatio.roundToNearestPixel((heightPercentage / 100) * height);
export const widthInDp = (widthPercentage: number) =>
  PixelRatio.roundToNearestPixel((widthPercentage / 100) * width);
