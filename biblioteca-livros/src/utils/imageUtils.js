
export const normalizeImageUrl = (imageLinks) => {
  if (!imageLinks) return '';
  

  let imageUrl = imageLinks.thumbnail || 
                 imageLinks.smallThumbnail || 
                 imageLinks.medium || 
                 imageLinks.small || 
                 '';
  
  if (imageUrl && imageUrl.startsWith('http:')) {
    imageUrl = imageUrl.replace('http:', 'https:');
  }
  
  return imageUrl;
};
