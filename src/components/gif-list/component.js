import React from 'react'
import axios from 'axios'
import { API_ENDPOINT, CARD_COUNT } from '../../constants/url'
import "./styles.css"
import Search from '../search/component'
import Skeleton from '../skeleton/component'
import Toggle from '../toggle/component'

const GifList = ({setIsDarkThemeActive}) => {
    const [gifData, setGifData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [offset, setOffset] = React.useState(0);
    const gifRef = React.useRef();

    const fetchGifs = (endpoint, query) => {
        if(loading) return;
        setLoading(true)
        const queryParams = query ? `&${query}` : "";
        return new Promise((resolve, reject) => {
            try {
                axios.get(`${API_ENDPOINT}/v1/${endpoint}?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=${CARD_COUNT}${queryParams}`).then((response) => {
                    setLoading(false);
                    resolve(response)
                }).catch((err) => {
                    setLoading(false)
                    reject(err)
                })
            } catch (error) {
            }

        })
    }

    const handleSearch = (value) => {
        if(!!value) {
            fetchGifs("gifs/search", `q=${value}`);
        }else {
            fetchGifs("gifs/trending", `&offset=${offset}`).then((response) => {
                setGifData(() => {
                    return [...response.data.data];
                });
                setOffset(0);
            })
        }
        
    }

    const getGifData = () => {
        fetchGifs("gifs/trending", `&offset=${offset}`).then((response) => {
            setGifData((prev) => {
                return [...prev, ...response.data.data];
            });
            setOffset(response.data.pagination.offset + response.data.pagination.count);
        })
    }

    const handleToggleChange = (value) => {
        setIsDarkThemeActive(value);
    }

    React.useEffect(() => {
        getGifData();
    }, [])

    React.useEffect(() => {
        const handleInfiniteScroll = () => {
            const endOfPage = window.innerHeight + window.scrollY >= gifRef.current.offsetHeight;
            if (endOfPage && !loading) {
                getGifData()
            }
          };
        window.addEventListener("scroll", handleInfiniteScroll)
    }, [])

  return (
    <section className='gifWrapper'>
        <div className='search'>
        <div className='topSection'>
            <div className='searchContainer'>
                <p>Search gif</p>
                <Search handleSearch={handleSearch} />
            </div>
            <Toggle handleToggle={handleToggleChange} />
        </div>
        </div>
        {loading && <Skeleton />}
        <div className='gifListContainer' ref={gifRef}>
            {!loading &&  gifData.length > 0 && gifData.map((gif) => {
                return (
                    <div key={gif.id + "" + gif.title} className='gifStyling'>
                        <img src={gif.images?.fixed_height?.webp} alt={gif.title}  />
                        <p>{gif.title}</p>
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default GifList