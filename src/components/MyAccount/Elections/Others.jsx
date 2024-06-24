const Others = ({ rank, name, age, country, email, phone, user_type }) => {
  return (
    <>
      {user_type === "NP" ? (
        <>
          <div className="flex justify-between items-center gap-2">
            <div>
              <p>{rank}</p>
            </div>
            <div>
              <p className="cursor-pointer select-none text-gray_first">
                Update Rank ✏️
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center gap-2">
          <div>
            <p>{rank}</p>
          </div>
        </div>
      )}

      <p>{name}</p>
      <p>{age}</p>

      <p>{country}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </>
  );
};

export { Others };
