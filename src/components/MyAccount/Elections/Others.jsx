const Others = ({ rank, name, age, country, email, phone, user_type, index }) => {
  return (
    <>
      {/*ovo je ispod, samo da probas: border-b-2 border-red-500 */}

      {/* if user is NP, then show "edit field". so we can reuse this same component for all that... */}
      <tr key={index}>
        {user_type === "NP" ? (
          <>
            {/* <div className="flex justify-between items-center gap-2"> */}

            <td className="flex gap-2 justify-start">
              <div>
                <p>{rank}</p>
              </div>
              <div>
                <p className="cursor-pointer select-none text-gray_first">
                  Update Rank <img src="myaccount/pencil.svg" style={{width: "10px", height: "10px", display: "inline-block", marginBottom: "5px"}} />
                </p>
              </div>
            </td>
            {/* </div> */}
          </>
        ) : (
          <>
            {/* <div className="flex justify-between items-center gap-2"> */}
            <td className="flex gap-2 justify-start">
              <p>{rank}</p>
            </td>
            {/* </div> */}
          </>
        )}

        <td>{name}</td>
        <td>{age}</td>
        <td>{country}</td>
        <td>{email}</td>
        <td>{phone}</td>
      </tr>

      <tr><td colSpan="6"><hr /></td></tr>
      {/* <hr /> */}
    </>
  );
};

export { Others };
