


        {/* AH and RS selecting NP */}
        {((currentUserType === "AH" || currentUserType === "RS" ) && passportStatus === "validated") && (
            <>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                className="m-4 ml-0 mb-1"
              >
                <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
                  <b>Vote for</b>
                </InputLabel>
  
                <Select
                  labelId="roleDropdowns"
                  value={votedFor}
                  onChange={handleVotedFor}
                  className="w-[200px]"
                  style={{ color: "#000" }}
                >
                  {top50Users.map((user) => (
                    <MenuItem key={user.userId} value={user.userId}>
                      {user.name}
                    </MenuItem>
                  ))}
  
                  {otherUsers.map((user) => (
                    <MenuItem key={user.userId} value={user.userId}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
  
          {/*  NP's selecting GP.  we have same selection for GP (for GP, it's if one tops another 120% more). */}
          {(
            selectedRole === "GP" && passportStatus === "validated" ) && (
            <>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                className="m-4 ml-0 mb-1"
              >
                <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
                  <b>Vote for</b>
                </InputLabel>
  
                <Select
                  labelId="roleDropdowns"
                  value={votedForGP}
                  onChange={handleVotedForGP}
                  className="w-[200px]"
                  style={{ color: "#000" }}
                >
                  {top50Users.map((user) => (
                    <MenuItem key={user.userId} value={user.userId}>
                      {user.name}
                    </MenuItem>
                  ))}
  
                  {otherUsers.map((user) => (
                    <MenuItem key={user.userId} value={user.userId}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          