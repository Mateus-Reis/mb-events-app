import {  withSpring, withSequence } from 'react-native-reanimated';

export const timingConfig = {
  duration: 300,
};

export const springConfig = {
  damping: 15,
  stiffness: 150,
  mass: 1,
};

export const buttonScale = withSequence(
  withSpring(0.95, springConfig),
  withSpring(1, springConfig)
);

export const fadeInConfig = {
  from: 0,
  to: 1,
  duration: 500,
};

export const slideInConfig = {
  from: 50,
  to: 0,
  duration: 500,
};

export const zoomInConfig = {
  from: 0.8,
  to: 1,
  duration: 500,
};

export const staggerDelay = 100;