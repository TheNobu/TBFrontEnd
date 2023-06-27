import axios from "axios";
import './Page2.css'
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Page2 = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const goBackPage  = () =>{
        navigate('/')
    }
    

    const fethData2 = useCallback(async()=>{
        try {
            setLoading(true)
            const {data} = await axios.get('https://api.jikan.moe/v4/manga')
            setData(data.data)
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
    },[]) 

    useEffect(()=>{
        fethData2()
    },[])

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
                <button onClick = {goBackPage}>Back Page</button>
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