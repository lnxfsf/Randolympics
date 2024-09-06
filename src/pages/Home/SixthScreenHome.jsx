


const SixthScreenHome = () => {

    return (<>
        <div className=" bg-red_third h- m-16 rounded-2xl flex lexend-font text-black_second">


            <div className="basis-1/2 flex flex-col p-16 pl-10  justify-center">


                <p className="text-2xl md:text-4xl font-bold">Ready to get started ?</p>


                <p className=" font-medium mt-4" >Sign Up today and start living the adventure.</p>



                <p className="font-medium mt-2 text-sm">By clicking Sign Up you're confirming that you agree with our <span className="text-red_second">Terms and Conditions</span>.</p>


            </div>



            {/* // TODO, ovde treba zoom isto, da bi stao slika, upravo u tome..  */} 
            <div className="hidden md:basis-1/2 md:flex ">
                <img src="/home/join_us.jpg " className="rounded-r-2xl" />
            </div>

            
        </div>




    </>)
}

export {SixthScreenHome}