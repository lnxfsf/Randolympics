







const ItemEconomicsList = ({ post, index, onClick }) => {



    return (
        <>

            <div key={index} className="p-4 border-2 m-2 cursor-pointer flex justify-between items-center" onClick={onClick}  >

                <div>
                    <p>{post.title}</p>
                    <p>{post.subtitle}</p>
                </div>


                <div>
                    <p>{post.updatedAt}</p>
                </div>


            </div>
        </>
    )
}





export { ItemEconomicsList }
