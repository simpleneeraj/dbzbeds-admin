const imageToUrl = (image: File | null) => {
    if (typeof image === 'string') {
        return image
    }
    if (typeof image === 'object') {
        if (!image) return null
        return URL.createObjectURL(image);
    }
};

export default imageToUrl;
