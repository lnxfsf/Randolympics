

import "../../styles/home.scoped.scss"



const ThirdScreenHome = () => {


    return (<>

<div className="flex bg-[#F8F8F8] min-h-screen flex-col md:flex-row">



      




        <div className="md:basis-1/2 xl:basis-1/3  justify-center items-center lg:block 2xl:m-16  container_beliefs min-h-screen">
               
                <img src="/home/beliefs.jpg" className="image_beliefs rounded-xl" />
                
        </div>




      
      <div className="flex p-8  grow flex-col justify-center items-start text-black_second lexend-font  ">
      
        <p className="text-3xl md:text-4xl font-bold mb-2">Our Beliefs</p>

        <p className="font-medium text-lg md:text-xl mb-4 xl:w-[44em]">We welcome everyone to participate and compete, regardless of nationality, race, values, religion, political views, gender, sexual orientation, or age.
        </p>


        <div>
        <div className="flex gap-2 items-center mb-2">
            <img src="/home/earth.svg" />
            <p className="text-xl  font-bold ">Global Inclusion and Support</p>
        </div>

        <p className="font-medium mb-4 xl:w-[44em]">In times of tension, the world needs us more than ever. Our host cities will ensure everyone can join, arranging necessary visas for all participants. We stand against any political pressure to exclude athletes based on their identity or beliefs.
        </p>
        </div>



        <div>
        <div className="flex gap-2 items-center mb-2">
            <img src="/home/trust.svg" />
            <p className="text-xl  font-bold ">Commitment to Transparency</p>
        </div>

        <p className="font-medium mb-4 xl:w-[44em]">Transparency is our commitment, using open-source technology for payments and communication. Our democratic approach guarantees equal rights and voting power for every nation and citizen.</p>
        </div>




        <div>
        <div className="flex gap-2 items-center mb-2">
            <img src="/home/morale.svg" />
            <p className="text-xl  font-bold ">Adherence to Core Values</p>
        </div>

        <p className="font-medium mb-4 xl:w-[44em]">We may not always have luxury, sometimes staying in tents or using old equipment, but we will never compromise on our core values.</p>
        </div>



      </div>

</div>



    </>
    )
}

export {ThirdScreenHome}