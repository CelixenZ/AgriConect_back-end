export const handleMongoError = (error: any) => {
  if (error?.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return `${field} already exists`;
  }
  return error.message || "Something went wrong";
};
