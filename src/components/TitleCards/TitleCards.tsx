import './TitleCards.css'
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface TitleCardsProps {
    title?: string;
    category?: string
}

interface Movie {
    backdrop_path: string;
    original_title: string;
    id:string;
}

const TitleCards = (props: TitleCardsProps) => {
    const { title, category } = props;

    const [apiData, setApiData] = useState<Movie[]>([]);

    const cardsRef = useRef<HTMLDivElement | null>(null);

    const options: RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTQ3MGZjZmY0MmE3YmZlYmMyNWI3ODY2OTk2MjExZSIsIm5iZiI6MTczMDk2NTY1NS43MDM2NjQ4LCJzdWIiOiI2NzJjNmZiZjg5OGQxOGU2OTA5NWYyOGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.o3S48Zpbw-fndGSFjVReA3wtBHvrkJ8-BzSxY4puW7o'
        }
    };

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (cardsRef.current) {
            cardsRef.current.scrollLeft += event.deltaY;
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        const currentRef = cardsRef.current;
        if (currentRef) {
            currentRef.addEventListener('wheel', handleWheel as unknown as EventListener);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('wheel', handleWheel as unknown as EventListener);
            }
        };
    }, []);

    return (
        <div className='titleCards'>
            <h2>{title ? title : 'Popular on Netflix'}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>;
                })}
            </div>
        </div>
    );
};

export default TitleCards;