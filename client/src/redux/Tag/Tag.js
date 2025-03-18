export const tags = [
  // Admin
  {
    name: "contact",
    tag: "Contact",
  },
];

export const getTagsByModuleName = (moduleName) => {
  return tags
    .filter(tag => tag.name.toLowerCase() === moduleName.toLowerCase())
    .map(tag => tag.tag);
};
