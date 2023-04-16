export const fetchClientIp = async () => {
  try {
    const response = await fetch('/api/client-ip');
    const data = await response.json();
    return data.clientIp;
  } catch (error) {
    console.error('Error fetching client IP:', error);
    return null;
  }
};
