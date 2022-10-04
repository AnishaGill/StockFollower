import { useEffect } from "react"
import { useState } from "react"
import finnHub from "../apis/finnHub"


export const AutoComplete = ({followingList, setFollowingList}) => {

    const [search, setSearch] = useState("")
    const [results,setResults] = useState([])


    const addStockToWatchList = (stockSym) => {
        setFollowingList([...followingList, stockSym])
    }

    const renderDropdown = () => {
       
        const shouldDrop = search ? "show" : null
        // check to see if results != NULL if so put "show" in ul tag

        return(
            <ul style={{
                height: "600px",
                overflowY: "scroll",
                overflowX: "hidden",
                cursor: "pointer"
            }}
            className={`dropdown-menu ${shouldDrop}`}>
                {results.map((result)=>{
                    return (
                        <li onClick={()=> {addStockToWatchList(result.symbol)}}
                        key={result.symbol} className="down-item">{result.description} ({result.symbol})</li>
                    )
                }
            
                )}
            </ul>
        )
    }

    useEffect(() => {
    
        let isMounted = true
        const fetchData = async() =>{
            try{
                const response = await finnHub.get("/search",{
                    params: {
                        q: search
                    }
                })
                console.log(response)
                if (isMounted){
                    setResults(response.data.result)
                }

            } catch(err){
                console.log("HI")
            }


        }
        if (search.length>0){
            fetchData()
        } else {
            setResults([])
        }
        return () => (isMounted = false)

    },[search])

    return <div className="w-50 p-5 rounded mx-auto">
        <div className="form-floating dropdown">
            <input id="search" type="text" className="form-control" placeholder="Search" autoComplete="off" value={search} onChange={(e) =>
            setSearch(e.target.value)}>
            </input>
                <label htmlFor="search">Search by symbol</label>
                {renderDropdown()}
        </div>
    </div>

}