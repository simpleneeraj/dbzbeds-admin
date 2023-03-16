const handleImageURL = (url: string | File) => {
  if (typeof File !== "undefined")
    if (url instanceof File) {
      return URL.createObjectURL(url);
    } else {
      return url;
    }
};

export default handleImageURL;
