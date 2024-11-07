import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

    const [apiData, setApiData] = useState({
            name: '',
            key: '',
            published_at: '',
            typeOf: ''
        });
    
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results[0]))
            .catch(err => console.error(err));
    }, []);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTQ3MGZjZmY0MmE3YmZlYmMyNWI3ODY2OTk2MjExZSIsIm5iZiI6MTczMDk2NTY1NS43MDM2NjQ4LCJzdWIiOiI2NzJjNmZiZjg5OGQxOGU2OTA5NWYyOGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.o3S48Zpbw-fndGSFjVReA3wtBHvrkJ8-BzSxY4puW7o'
        }
      };
      
    return (
        <div className='player'>
            <img src={back_arrow_icon} alt="" onClick={() => {navigate(-2)}} />
            <iframe width='90%' height='90%'
                src={`https://www.youtube.com/embed/${apiData.key}`} title='Trailer' frameBorder='0' allowFullScreen>    
            </iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.typeOf}</p>
            </div>
        </div>
    );
}

export default Player;