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
      ? [5, -5, 0]
      : isTablet
      ? [5, -5, 0]
      : [9, -5.5, 0],
    reactLogoPosition: isSmall
      ? [3, 4, 0]
      : isMobile
      ? [5, 4, 0]
      : isTablet
      ? [5, 4, 0]
      : [12, 3, 0],
    ethereumLogoPosition: isSmall
      ? [-4, 2, 0]
      : isMobile
      ? [-4, 2, 0]
      : isTablet
      ? [-6, 0, 0]
      : [-11, 1, 0],
    targetPosition: isSmall
      ? [-5, -10, -10]
      : isMobile
      ? [-9, -10, -10]
      : isTablet
      ? [-11, -7, -10]
      : [-13, -13, -10],
  };
};

export { calculateSizes };
