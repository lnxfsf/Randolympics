import { Avatar, AvatarGroup } from "@mui/material";
import Flag from "react-world-flags";
import { settingUserType } from "../../context/user_types";


const SubHeaderPart = ({athlete, howManySupporters}) => {
  return (
    <>
      <div className="lexend-font text-black_second mt-8 m-6 md:m-8 flex-col md:flex-row">
        <div className="flex gap-4   mt-0 items-center">
          <p className="text-2xl font-bold">
            {athlete.name} {athlete.middleName && <> ({athlete.middleName}) </>}
            {athlete.lastName}{" "}
          </p>

          <div>
            <Flag className="w-4 md:w-8 " code={athlete.nationality} />
          </div>
        </div>

        <p className="text-[#616673] font-medium">
          {settingUserType(athlete.user_type)}
        </p>

        <p className="mt-1">{athlete.athleteStatement}</p>

        <p className="mt-1">{howManySupporters} supporters</p>

        <div className="flex justify-start mt-2">
          <AvatarGroup
            max={5}
            sx={{
              "& .MuiAvatar-root": {
                width: { xs: 35, md: 40 }, // Ensuring all avatars have the correct size
                height: { xs: 35, md: 40 },
              },
            }}
          >
            <Avatar
              sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
            >
              {athlete.name.charAt(0).toUpperCase()}
            </Avatar>
            <Avatar
              sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
            >
              {athlete.name.charAt(0).toUpperCase()}
            </Avatar>
            <Avatar
              sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
            >
              {athlete.name.charAt(0).toUpperCase()}
            </Avatar>
            <Avatar
              sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
            >
              {athlete.name.charAt(0).toUpperCase()}
            </Avatar>
            <Avatar
              sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
            >
              {athlete.name.charAt(0).toUpperCase()}
            </Avatar>
            <Avatar
              sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
            >
              {athlete.name.charAt(0).toUpperCase()}
            </Avatar>
            <Avatar
              sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
            >
              {athlete.name.charAt(0).toUpperCase()}
            </Avatar>
            <Avatar
              sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
            >
              {athlete.name.charAt(0).toUpperCase()}
            </Avatar>

            <Avatar
              sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
            >
              {athlete.name.charAt(0).toUpperCase()}
            </Avatar>
            <Avatar
              sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
            >
              {athlete.name.charAt(0).toUpperCase()}
            </Avatar>
          </AvatarGroup>
        </div>
      </div>
    </>
  );
};

export { SubHeaderPart };
