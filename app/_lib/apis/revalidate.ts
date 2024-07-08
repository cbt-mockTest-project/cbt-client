import axios from 'axios';

export const revalidatePath = async (path: string) => {
  await axios.post(
    `/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN}`,
    { path }
  );
};
