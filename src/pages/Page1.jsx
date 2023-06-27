import { useCallback, useEffect, useState } from 'react';
import './Page1.css'
import './Header.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Page1 = () => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()


    const page1ToPaga2 = () =>{
        navigate('/page2')
    }

    const fenchData = useCallback(async()=>{
        try {
            setLoading(true)
            const {data} = await axios.get('https://api.jikan.moe/v4/top/anime')
            setData(data.data) 
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
    },[])

    useEffect(()=>{
        fenchData()
    },[])

    const renderData = () =>{
        if(loading){
            return(
                <h3>Loading</h3>
            )
        }
        return(
            <div>
                <header className='header'>
                    <h3 className='fontColor'>Top Animes</h3>
                </header>
                <div className='colunm'>
                    {data.map(anime =>(
                    
                        <div className='aruma'>
                            <a href={anime.url} target = '_blank'>
                            <img src={anime.images.jpg.image_url}/>
                            </a>
                            <h4 className='fontColor'> {anime.title_english}</h4>
                        </div>        
                ))}
                    
                </div>
                <button onClick={page1ToPaga2}> Next Page</button>
            </div>
        )
    }
    return (
        <div className='container1'>
            {renderData()}

        </div>
    );
}

export default Page1;