let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;

const Campaign = () => {
  return (
    <>
      <p className="text-3xl">List of all campaigns</p>

     
    </>
  );
};

export { Campaign };
