import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <Circle cx="40" cy="40" r="30" />
    <Rect x="80" y="20" rx="5" ry="5" width="300" height="10" />
    <Rect x="80" y="40" rx="5" ry="5" width="250" height="10" />
    <Rect x="80" y="60" rx="5" ry="5" width="200" height="10" />
  </ContentLoader>
);

export default Skeleton;
