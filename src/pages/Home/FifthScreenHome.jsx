
import "../../styles/home.scoped.scss"

const FifthScreenHome = () => {

    return (<>
    
    <p className="text-2xl md:text-4xl font-bold text-center lexend-font text-black_second mt-16">How it works</p>

    <div className="flex w-full min-h-screen lexend-font text-black_second ">

        <div className="md:basis-1/2 flex justify-start flex-col   p-16"> 

            <div className="flex" >

                <div className="ml-[4rem] mr-8 flex items-start">
                     <img src="/home/startProgressContainer.svg" className="h-32" />
                </div>


                <div className="flex flex-col items-start justify-start  mt-2 ">

                    <p className="text-2xl font-bold" >Now</p>

                    <p className=" font-bold">Campaign Phase: Nominate and Support</p>
                </div>

            </div>



            {/* second */}
            <div className="flex " >


                <div className="ml-[3.72rem] mr-8 flex items-start h-32">
                    <img src="/home/centreProgressContainer.svg" className="h-[100%]" />
                </div>


                <div className="flex flex-col items-start justify-start      ">

                    <p className="text-2xl font-bold" >June 25th 2026</p>

                    <p className=" font-bold" >Final Ranking and Selection</p>
                </div>

            </div>




            {/* third */}
            <div className="flex justify-start items-start " >


            <div className="ml-[3.72rem] mr-8 flex items-start h-32">
                <img src="/home/centreProgressContainer.svg" className="h-[100%]" />
            </div>


            <div className="flex flex-col items-start justify-start      ">

                <p className="text-2xl font-bold">June 2026 - June 2028</p>

                <p className=" font-bold">Two-Year Preparation Period</p>
            </div>

            </div>




            {/* fourth */}
            <div className="flex" >


                <div className="ml-[3.72rem] mr-8 flex items-start h-32">
                    <img src="/home/centreProgressContainer.svg" className="h-[100%]" />
                </div>


                <div className="flex flex-col items-start justify-start">

                    <p className="text-2xl font-bold">June 25th 2028</p>

                    <p className=" font-bold">Opening Ceremony: Athletes receive their randomly assigned sports</p>
               
                </div>

            </div>







        </div>




        <div className="hidden md:flex basis-1/2 flex-col justify-center gap-4 m-16 ">

          <img src="/home/home1.png" className="2xl:w-[70%]"  />



            <img src="/home/home2.png" className="2xl:w-[70%]" />




            <img src="/home/home3.png" className="2xl:w-[70%]" /> 








        </div>


    </div>
    
    
    </>)
}


export { FifthScreenHome }