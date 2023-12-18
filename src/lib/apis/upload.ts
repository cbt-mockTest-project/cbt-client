import axios from 'axios';

export const uploadAPI = (formData: FormData) =>
  axios.post<{ url: string }>(
    `
${process.env.NEXT_PUBLIC_RESTAPI_URL}uploads`,
    formData
  );
