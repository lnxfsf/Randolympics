const Top50 = ({ rank, name, age, country, email, phone, user_type }) => {
  return (
    <>
      {/*ovo je ispod, samo da probas: border-b-2 border-red-500 */}

      {/* if user is NP, then show "edit field". so we can reuse this same component for all that... */}

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

      {/* <hr /> */}
    </>
  );
};

export { Top50 };
