


const BeliefsDropDownMenu = ({ scrolled  }) => {




    return (

        <>
            <div className={`beliefs-dropdown-menu ${scrolled ? 'scrolled' : ''} p-4`}  >
                <div>
                    <p className=" text-red_first font-semibold text-base">Our beliefs</p>


                    {/* grid  grid-rows-4 grid-cols-2  h-64   gap-y-24*/}
                    {/* sa ovime uzmi.. min-h-64 */}
                    <div className="grid  grid-rows-4 grid-cols-2  min-h-64  mt-2 ">

                        <div className=" mt-1 ">
                           <hr />
                            <p className="pt-2 pb-2">We welcome everyone to participate and compete, regardless of nationality, race, values, religion, political views, gender, sexual orientation, or age.</p>
                            
                            <hr />
                        </div>


                       
                      
                        <div className=" mt-1 ">
                           <hr />
                            <p className="pt-2 pb-2">Transparency is our commitment, using open-source technology for payments and communication.

                            </p>
                            
                            <hr />
                        </div>

                        <div className=" mt-1 ">
                           
                            <p className="pt-2 pb-2">In times of tension, the world needs us more than ever. Our host cities will ensure everyone can join, arranging necessary visas for all participants.</p>
                            
                            <hr />
                        </div>
                        



<div className=" mt-1 ">
                          
                            <p className="pt-2 pb-2">We may not always have luxury, sometimes staying in tents or using old equipment, but we will never compromise on our core values.

                            </p>
                            
                            <hr />
                        </div>


                        <div className=" mt-1 ">
                           
                            <p className="pt-2 pb-2">We stand against any political pressure to exclude athletes based on their identity or beliefs.


                            </p>
                            
                            <hr />
                        </div>


                        <div>

                        </div>
                        

                      





                        






                    </div>



                </div>

            </div>

        </>
    )
}

export { BeliefsDropDownMenu }