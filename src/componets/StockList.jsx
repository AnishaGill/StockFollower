import {useState, useEffect} from "react";
import finnHub from "../apis/finnHub";

/* List of Stocks we are tracking*/
export const StockList = ({followingList, setFollowingList}) => {

    /* Array of stock following*/
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"])

    /* data array of stock following*/
    const [stock, setStock] = useState()

    useEffect(() => {
        let isMounted = true
         /* await the resp of the api request, catt err if data not gotten  */
         
         const fetchData = async() => {
            try {
                const responses = await Promise.all(watchList.map((st) => {
                    return finnHub.get("/quote", {
                        params: {
                            symbol: st
                        }
                    })
                }))
                
            
                console.log(responses)


                const data = responses.map((res) => {
                return{
                    data: res.data,
                    symbol: res.config.params.symbol
                    }
                })
                console.log(data)


                if(isMounted){
                    setStock(data)
                }


            } catch(err){
                console.log("Error fetching stock data")
            }
        }
        fetchData()
        return () => (isMounted = false)

    },[watchList])
    /* Only run on the first render (only when componet mounts)*/


return <div>
    <table className="table hover mt-5">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Last</th>
                <th scope="col">Chq</th>
                <th scope="col">Chq%</th>
                <th scope="col">High</th>
                <th scope="col">Low</th>
                <th scope="col">Open</th>
                <th scope="col">PClose</th>
                </tr>
            </thead>
            <tbody>
                {stock?.map((stData) => {
                    return (
                    <tr className="table-row" key={stData.symbol}>
                        <th scope="row">{stData.symbol}</th>
                        <td>{stData.data.c}</td>
                        <td>{stData.data.d}</td>
                        <td>{stData.data.dp}</td>
                        <td>{stData.data.h}</td>
                        <td>{stData.data.l}</td>
                        <td>{stData.data.o}</td>
                        <td>{stData.data.pc}</td>
                    </tr>
                    )
                })}

            </tbody>
        </table>
    </div>



}