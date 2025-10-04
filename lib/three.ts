type Dimension = [number, number, number];

interface CalculatedSizes {
  deskScale: number;
  deskPosition: Dimension;
  cubePosition: Dimension;
  reactLogoPosition: Dimension;
  ethereumLogoPosition: Dimension;
  targetPosition: Dimension;
}

const calculateSizes = (
  isSmall: boolean,
  isMobile: boolean,
  isTablet: boolean
): CalculatedSizes => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall
      ? [4, -5, 0]
      : isMobile
      ? [5, -4.5, 0]
      : isTablet
      ? [7, -6, -2] // 태블릿: x를 더 멀리, y를 아래로, z를 뒤로
      : [9, -5.5, 0],
    reactLogoPosition: isSmall
      ? [3, 4, 0]
      : isMobile
      ? [5, 4, 0]
      : isTablet
      ? [8, 2, -1] // 태블릿: x를 더 멀리, y를 낮게, z를 뒤로
      : [10, 3, 0],
    ethereumLogoPosition: isSmall
      ? [-4, 2, 0]
      : isMobile
      ? [-5, 4, 0]
      : isTablet
      ? [-8, -1, -2] // 태블릿: x를 더 멀리, y를 아래로, z를 뒤로
      : [-11, 1, 0],
    targetPosition: isSmall
      ? [-5, -10, -10]
      : isMobile
      ? [-7, -8, -8]
      : isTablet
      ? [-9, -10, -7] // 태블릿: y를 -8에서 -5로 위로, z를 -10으로 되돌림
      : [-13, -10, -7],
  };
};

export { calculateSizes };
