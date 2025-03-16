export const tags = [
 
  // Admin

  {
    name: 'projects', 
    tag: 'Projects', 
  },
  {
    name: 'testimonials', 
    tag: 'Testimonials', 
  },
  {
    name: 'testimonials', 
    tag: 'Testimonials', 
  },

  {
    name: 'heroBanner', 
    tag: 'Hero Banner', 
  },
  {
    name: 'partnerGoals', 
    tag: 'PartnerGaols', 
  },
  {
    name: 'services', 
    tag: 'Services', 
  },



];

export const getTagsByModuleName = (moduleName) => {
  return tags
    .filter(tag => tag.name.toLowerCase() === moduleName.toLowerCase())
    .map(tag => tag.tag);
};