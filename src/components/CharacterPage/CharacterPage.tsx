import { useParams } from "react-router";
import {type CharacterType, rickAndMortyApi} from '../../api/api.ts';
import s from './CharacterPage.module.css'
import {useState} from 'react';


export const CharacterPage = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState<CharacterType | null>(null)
    const [error, setError] = useState<string>('')

    const searchCharacter = () =>{
        if(!id) return
        rickAndMortyApi.searchCharacter(id).then(res =>{
            setCharacter(res.data)
        }).catch(()=>setError('some error'))
    }
    searchCharacter()
    return (
        <div className={s.wrapper}>
            <div className={s.characterCard}>
                {error ? <p className={s.error}>{error}</p> :
                    <>
                        <h1>{character?.name}</h1>
                        <p>species: {character?.species}</p>
                        <p>gender: {character?.gender}</p>
                        <div className={s.imgWrapper}>
                            <img src={character?.image} className={s.img} alt={'picture'}/>
                        </div>
                    </>
                }
            </div>
        </div>

    );
};

