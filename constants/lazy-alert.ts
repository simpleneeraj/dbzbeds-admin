const lazyAlert = (succes?: any, error?: any) => {
    return new Promise((resolve, reject) => {
        resolve(alert(succes));
        reject(alert(error));
    });
};

export default lazyAlert;
