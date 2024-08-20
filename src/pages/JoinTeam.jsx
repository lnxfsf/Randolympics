

import { useNavigate } from "react-router-dom";



const JoinTeam = () => {

    const navigate = useNavigate();

    return (<>


    <div
    
    style={{
        backgroundImage: "url('/jointeam/jointeam.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
        backgroundPosition: "center",
        color: "#fff"
      }}

      


    >




    <p className="text-2xl flex p-8 justify-center items-center">Join the team</p>

<div className="p-12">

    <p>Are you passionate about sports, organization, or technology? Do you have the skills and drive to make a global impact? At Randolympics, we're looking for talented and motivated individuals to join our team. Whether you’re interested in leading global strategies, managing key operations, or driving local initiatives, there’s a place for you in our dynamic and fast-growing organization.
Positions within Randolympics</p> <br/>

<p className="text-2xl">Global Leadership</p>
<div className="pl-4">
<p><b>Global President</b>: Lead the Randolympics organization, setting the vision and overseeing all global operations.
Managers</p>
<p><b>Legal Manager</b>: Ensure legal compliance and manage legal risks across all organizational activities.</p>
<p><b>IT Manager</b>: Oversee the technology infrastructure, including website and digital platform management, ensuring secure and efficient operations.</p>
<p><b>Validation Manager</b>: Verify athlete eligibility, ensure supplier compliance, and maintain overall process integrity.</p>
<p><b>Marketing Manager</b>: Develop and implement global marketing strategies to promote the Randolympic Games.</p>
<p><b>Sales Manager</b>: Generate revenue through sponsorships, partnerships, and ticket sales.</p>
<p><b>Event Manager</b>: Plan and execute the Randolympic Games, managing logistics and ensuring smooth operations.</p>
</div>


<br/>
<p className="text-2xl">National Positions (per Country)</p>
<div className="pl-4">
<p><b>National Manager</b>: Lead Randolympic efforts within your country, coordinating local activities and overseeing referees.</p>
<p><b>Referees</b>: Officiate competitions in your sport specialty and assist the National Manager with event logistics and support.</p>
</div>

<br/>
<p className="text-2xl">Ready to Make an Impact?</p>
<p>If you’re ready to contribute to an exciting global movement and help bring the Randolympics to life, we want to hear from you!</p>

</div>

<br/><br/>
<div className="flex justify-center items-center p-8">
<button style={{backgroundColor: "red"}}  onClick={() => navigate("/register")}>Apply now</button>
</div>
</div>
    </>)
}

export {JoinTeam};
