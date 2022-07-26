export const generateFileName = (filename: string): string => {
  return `${Date.now()}-${filename}`;
};
