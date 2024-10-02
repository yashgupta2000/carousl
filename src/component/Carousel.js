import React, { useEffect, useState } from 'react'

export default function Carousel() {

    const [apiData, setApiData] = useState();
    const [activeSlide, setActiveSlide] = useState(0)

    async function fetchData() {
        const fetchAPI = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', {

            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTAxMDQzNGZmMGE4ZmEzNDZkZmZmODc2MThhNDAzYiIsIm5iZiI6MTcyMjI4MDkxOS4wMzgyMzIsInN1YiI6IjYzMmRkNGViMDQ0M2M5MDA3Y2NjOWE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hgf7kz5JACjDXKvnCL4oJnyoszsrlmBMlGcpfrdHp-c'
            }

        });
        const json = await fetchAPI.json();
        setApiData(json.results);
        console.log(json.results);

    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleNext = () => {
        setActiveSlide((prev) => apiData.length - 1 > activeSlide ? prev + 1 : 0)
        // setActiveSlide((prev) => (prev > 0 ? prev - 1 : apiData.length - 1));

    }

    const handlePrev = () => {
        setActiveSlide((prev) => apiData.length - 1 < activeSlide ? prev - 1 : 0)

    }
    return (<>
        <div style={{marginTop:'30px', marginBottom:'100px', fontSize:'25px'}}>Carousel</div>
        <div style={{display:'flex', justifyContent:'space-around',margin:'auto', width:'50rem',justifyItems:'center'}}>
            <div style={{marginTop:'20%',}}>
                <button style={{ background: 'none', border: '2px solid black', padding:'12px 6px', borderRadius:'50%' }} onClick={handlePrev}>Prev</button>
            </div>
            <div style={{ width: '30%', display: 'flex', justifyContent: 'center',  position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    display: 'flex', width: '100%',  transform: `translateX(-${activeSlide * 100}%)`, transition: 'transform 0.5s ease-in-out',
                }}>
                    {apiData?.map((item, index) => (

                        <img style={{ width: '100%', objectFit: 'cover', flex: '1 0 100%', }} src={`https://image.tmdb.org/t/p/w300/` + item.poster_path} />

                    ))}
                </div>
            </div>
            <div style={{marginTop:'20%'}}>
                <button style={{ background: 'none', border: '2px solid black',padding:'12px 6px', borderRadius:'50%' }} onClick={handleNext}>Next</button>
            </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px', }}>
            {apiData?.map((item, index) => (
                <>
                    <span key={index} style={{ width: '10px', height: '10px', margin: '2px', display: 'inline-block', padding: '5px', height: 'auto', backgroundColor: activeSlide === index ? "black" : "grey", borderRadius: '10px' }}></span>
                </>
            ))}
        </div>


    </>
    )
}
