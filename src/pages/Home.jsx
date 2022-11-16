// IMPORTS
import './home.scss'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from '../components/filter/Filter'
import DiamondIcon from '@mui/icons-material/Diamond';
import CasinoIcon from '@mui/icons-material/Casino';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Home = () => {
    // STATES
    const [giochi, setGiochi] = useState([])
    const [valueFilter, setValueFilter] = useState('netent')
    const [valueSearch, setValueSearch] = useState('')
    const [categoryPage, setCategoryPage] = useState('Casino')
    // VARIABLES
    const excludedProviders = ['texinho', 'virtual1x2']
    const providers = []
    const readyGames = []
    // CASINO ARRAYS

    var array_casino_live = ['aviator', 'hollywoodtv', 'creedroomz', 'ezugi', 'xpg', '7mojos live', 'sagaming', 'ebet', 'absolute live gaming', 'evolution', 'vivo', 'evolutionlivecasino', 'ezugi', 'portomaso', 'betgamestv', 'live168', 'liveg24'];

    var array_virtual = ['fiablegames', 'spribe', 'virtual generation', 'edgevirtuals', 'racing', 'multigames', 'kiron', 'goldenrace', '1x2virtual', 'virtualgeneration', 'virtual_1x2'];

    var array_casino_gold = ['1x2', 'bbtech ', 'superlotto', 'booongo', 'pgsoft', 'espresso', '7mojos slots', 'bet2tech', 'funta gaming', 'gamzix', 'felix', 'games inc', 'triplecherry', 'simpleplay', 'netgame', 'allwayspin', 'green jade', 'kalamba', 'tpg', 'caleta', 'charismatic', 'bgaming', 'betsolutions', 'mrslotty', 'truelab', 'evoplay', 'irondog', 'fugaso', 'boominggames', 'endorphina', 'feltgaming', 'nolimit', 'boongo', 'eagaming', 'apollo', 'augustgaming', 'casino_technology', 'fazi', 'justplay', 'kagaming', 'onetouch', 'playpearls', 'spinmatic', 'superspade', 'tomhorn', 'wearecasino', 'woohoo', 'pragmatic', 'betsoft', 'novomatic', 'egt', 'playngo', 'amatic', 'netent', 'merkur', 'quickspin', 'wazdan', 'bomba', 'aristocrat', '1x2', 'gameart', 'habanero', 'igrosoft', 'irondog', 'isoftbet', 'leapgaming', 'platipus', 'playson', 'red_rake', 'skywind', 'spinomenal', 'xplosive', 'yggdrasil'];
 
    
    // END CASINO ARRAYS
    // GAME LIST REQUEST
    useEffect(() => {
        axios.get('https://media.betall360.me/site/commons/js/gameList.json').then((response) => {
            //console.log('get axios request games list -->' , response.data.games)
            setGiochi(response.data.games)
        })
    }, [])
    // FILTER & PUSH PROVIER
    for(let i = 0; i < giochi.length; i++) {
        var provider = giochi[i].GAME_GROUP.toString().toLowerCase().replace('_desktop', '').replace('_mobile', '') ;
        //console.log(provider)
        
        if(providers.indexOf(provider) === -1){
            if(excludedProviders.indexOf(provider !== -1)){
                
                    
                    providers.push(provider)
                
            }
        }

    }

 


    console.log('array casino live ', array_casino_live)
    // Games List MANAGER
    var filteredGamesList =  giochi.filter((game) => {
        if(game.IS_MOBILE === 0) {
            if(readyGames.indexOf(game.GAME_NAME.toString().toLowerCase()) === -1) {
            // se valueSearch non è definito
                if(valueSearch === '') {
                    
                    // filter by provider
                    if(valueFilter === game.GAME_GROUP.toString().toLowerCase().replace('_desktop', '').replace('_mobile', '')) {
                        return game.GAME_GROUP.toString().toLowerCase().replace('_desktop', '').replace('_mobile', '') === valueFilter
                    } else if (valueFilter === "All") {
                        return game
                    }
                } else if (valueSearch !== '') {
                    if(game.GAME_NAME.toString().toLowerCase().includes(valueSearch.toLowerCase())) {
                        
                        return game
                        
                    }
                } else if (categoryPage === 'Casino') {
                    //TODO
                    // if is not found
                    if(valueFilter === game.GAME_GROUP.toString().toLowerCase().replace('_desktop', '').replace('_mobile', '')) {
                        return game
                    } 
                    
        
                }
                readyGames.push(game.GAME_NAME.toString().toLowerCase())
            }

        }
    })

    var filteredProviders = providers.filter((provider) => {
        if(categoryPage === 'Casino') {
            if(array_casino_live.indexOf(provider) === -1 && array_virtual.indexOf(provider) === -1) {
                return provider
            }
        } else  if(categoryPage === 'Casino Live') {
            if(array_casino_gold.indexOf(provider) === -1 && array_virtual.indexOf(provider) === -1) {
                return provider
            }
        } else  if(categoryPage === 'Virtual Games') {
            if(array_casino_gold.indexOf(provider) === -1 && array_casino_live.indexOf(provider) === -1) {
                return provider
            }
        }
    })

    useEffect(() => {
        setValueFilter(filteredProviders[0])
    }, [categoryPage])

    console.log('check readygames -->', readyGames)

    const handleClick = (event) => {
        event.preventDefault()
    }
    // SET FILTERED PROVIDER
    const onProviderSelected = (filterValue) => {
        setValueFilter(filterValue)
    }
    //console.log('check valueFilter --> ', valueFilter)
    // SET SEARCHED VALUE
    const onSearchValue = (searchValue) => {
        setValueSearch(searchValue)
    }
    //console.log('check searched value --> ', valueSearch)
    // SET CATEGORY
    const handleCategory = (categoryValue) => {
        setCategoryPage(categoryValue)
    }
    console.log('check category page value --> ', categoryPage)
    
    return (
        <div className='home'>
            <div className="casino">
                <div className="leftMenu">
                    <div className="providers_title">
                        <AutoStoriesIcon /> Providers ({providers.length})
                    </div>
                    <div className="providers">
                    {
                        filteredProviders.map((provider, key) => {
                            return (
                                <div className={`provider ${provider.toLowerCase().replace(' ', '').replace(' ', '')}`} onClick={handleClick} data-provider={`provider-${provider.toLowerCase().replace(' ', '').replace(' ', '')}`} key={key}>
                                    <div className="box">
                                        <span>
                                            <DiamondIcon />
                                            {provider}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>

                <div className="container">
                    <div className="banner_container">
                        <img src="https://bonanza365.me/frontend/Default/img/carousel/1_new.png" alt="" />
                    </div>
                    <Filter providersx={filteredProviders} filterValueSelected={onProviderSelected} searchValueSelected={onSearchValue} categoryPageValue={handleCategory} />
                    <div className="games_all">
                        <div className="games_header">
                            <span>
                                <CasinoIcon /> Games ({filteredGamesList.length})
                            </span>
                            <div className="provider_box">
                                <span>
                                    Provider : 
                                </span>
                                <img src={`//media.betall360.me/site/commons/img/providersNEW/${valueFilter}.png`} alt=""/>
                            </div>
                            
                        </div>
                        <div className="games_container">
                            {
                                filteredGamesList.map((game, key) => {
                                    return (
                                        <div className='game' data-provider={game.GAME_GROUP} key={key}>
                                            <img 
                                            src={`${game.IMG_PATH}`}
                                            onError={(e) =>
                                                
                                                    (e.target.src =`${game.IMG_PATH.replace('.jpg', '.png')}`)
                                            }
                                            alt="" />
                                            <span>{game.GAME_NAME}</span>
                                            
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home