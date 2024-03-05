import React, { useEffect, useState } from 'react';
import '../../assets/scss/Home.scss'
import apiConfig from '../../config/api';
import listViewIcon from './../../assets/images/listview.png';
import gridViewIcon from './../../assets/images/gridview.png';

const Home = () => {
    const [selectButton, setSelectButton] = useState<any>('now_playing');
    const [typeView, setTypeView] = useState<any>('listview');
    const [listMovie, setListMovie] = useState<any>([]);
    const [listMovieConst, setListMovieConst] = useState<any>([]);
    const [popup, setPopup] = useState<any>(false);
    const [selectMovie, setSelectMovie] = useState<any>(null);
    
    useEffect(() => {
        const fetch = require('node-fetch');
        fetch(apiConfig.url + `movie/${selectButton}?language=en-US&page=1`, apiConfig.options).then((res: any) => res.json())
        .then((json: any) => {
            setListMovieConst(json.results);
            setListMovie(json.results);
        })
        .catch((err: any) => alert('error:' + err));
    }, [selectButton])
    
    const selectTab = (text: string, str: string) => {
        if (str === 'button') {
            if (text !== selectButton) {
                setListMovie([])
                setListMovieConst([])
                setSelectButton(text);
            } 
        } else {
            setTypeView(text);
        }
    }

    const formatDate = (date: string) => {
        return date.split('-').reverse().join('/');
    }

    const handlePopup = (text: string, item: any) => {
        if (text === 'open') {
            setPopup(true)
            setSelectMovie(item)
        } else {
            setPopup(false);
            setSelectMovie(item)
        }
    }

    const filterMovies = (e: any) => {
        setListMovie(listMovieConst.filter((item: any) => item.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return (
      <div className='home'>
        <div className='top-container'>
            <div className='search-container'>
                <input type="text" placeholder='Search a movie' onChange={filterMovies}/>
            </div>
            <div className='tab-bar'>
                <button onClick={() => selectTab('now_playing', 'button')} className={selectButton === 'now_playing' ? 'selected' : ''} >Now Playing</button>
                <button onClick={() => selectTab('top_rated', 'button')} className={selectButton === 'top_rated' ? 'selected' : ''}>Top Rated</button>
            </div>
        </div>
        <div className='tab-view'>
            <button onClick={() => selectTab('listview', 'type')} className={typeView === 'listview' ? 'clicked' : ''} ><img src={listViewIcon} alt="" /></button>
            <button onClick={() => selectTab('gridview', 'type')} className={typeView === 'gridview' ? 'clicked' : ''}><img src={gridViewIcon} alt="" /></button>
        </div>
        <span style={{fontSize: '30px', fontWeight: '600'}}>{selectButton === 'now_playing' ? 'Now Playing Movies' : 'Top Rate Movies'}</span>
        <div className={typeView === 'listview' ? 'bottom-container' : 'bottom-container grid'}>
            {  listMovie.length === 0 ?  Array.from({ length: 4 }).map((item: any, i: number) => {
                return <div className='loading' key={i}></div>
            }) :  listMovie.map((item: any, i: number) => {
                return <div key={i} className='movie-item' onClick={() => handlePopup('open', item)}>
                            <img src={'http://image.tmdb.org/t/p/w500' + item.poster_path} alt="" />
                            <div className='right'>
                                <p>{ item.title }</p>
                                <p>{ formatDate(item.release_date) }</p>
                            </div>
                        </div>
                })     
            }    
        </div>
        {
            popup ?      <div><div className='bg'></div>
            <div className='popup-detail'>
                <div className='item-detail'>
                    <img src={'http://image.tmdb.org/t/p/w500' + selectMovie.backdrop_path} alt="" />
                    <div className='right'>
                        <p>{ selectMovie.title + ` (${selectMovie.original_title})` }</p>
                        <p><span>Overview:</span> { selectMovie.overview }</p>
                        <p><span>Release date:</span> { formatDate(selectMovie.release_date) }</p>
                        <p><span>Vote average:</span> { Math.round(selectMovie.vote_average) }/10</p>
                    </div>
                </div>  
                <button className='close-button' onClick={() => handlePopup('close', null)}>Close</button>
            </div> </div> : ''
        }
      </div>
    );
};

export default Home;