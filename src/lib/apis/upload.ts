import axios from 'axios';

export const uploadAPI = (formData: FormData) =>
  axios.post<{ url: string }>(
    `
${process.env.NEXT_PUBLIC_RESTAPI_URL}uploads`,
    formData
  );

export const fetchImageAsBase64 = async (url: string): Promise<string> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}uploads/base64?url=${url}`
  );
  return data;
};
