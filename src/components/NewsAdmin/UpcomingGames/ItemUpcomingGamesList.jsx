


const ItemUpcomingGamesList = ({post, index}) => {


    // this is one post... and just, display it rendered as it

    return (
        <>

        <div key={index} className="p-4 border-2 m-2" >

            <p>{post.title}</p>
            <p>{post.subtitle}</p>

            

        </div>
        </>
    )
}



export { ItemUpcomingGamesList }