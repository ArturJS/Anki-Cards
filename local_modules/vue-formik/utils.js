export const getChildren = children => {
  return Array.isArray(children) ? children : [children];
};
