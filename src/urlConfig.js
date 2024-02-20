const baseUrl = process.env.API || "https://rasan-rest-server-31c2cd634a56.herokuapp.com";

export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
    return `${baseUrl}/public/${fileName}`;
};
