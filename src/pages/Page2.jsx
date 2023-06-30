import axios from "axios";
import './Page2.css'
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Page2 = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)

    const navigate = useNavigate()

    const goBackPage  = () =>{
        navigate('/')
    }

    const changePage = () =>{
        setPage(page + 1)
    }

    const chagePageBack = () =>{
        setPage(page - 1)
        
    }

    const fethData2 = useCallback(async()=>{
        try {
            setLoading(true)
            const {data} = await axios.get(`https://api.jikan.moe/v4/manga?page=${page}`)
            setData(data.data)
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
    },[page]) 

    useEffect(()=>{
        fethData2()
    },[page])

    const renderData2 = () =>{
        if(loading){
            return(
                <h3>Loading</h3>
            )
        }
        return(
            <div>
                <header className='header'>
                    <h3 className='fontColor'>Mangas</h3>
                </header>
                <div className="colunm2">
                    {data.map(manga =>(
                       <div className="aruma2">
                        <a href={manga.url} target="_blank">
                        <img src={manga.images.jpg.image_url}/>
                        </a>
                        <h4 className="fontColor2">{manga.title}</h4>
                        <h4 className="fontColor2">Rank {manga.rank}</h4>
                        <h5 className="fontColor2">Score {manga.score}</h5>
                       </div> 
                    ))}
                </div>
                <button onClick={chagePageBack}>-</button>
                <button onClick = {goBackPage}>Back Page</button>
                <button onClick={changePage}>+</button>
            </div>


        )
    }

    return (
        <div className="container2">
            {renderData2()}
        </div>
    );
}

export default Page2;