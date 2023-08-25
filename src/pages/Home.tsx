import styled from "@emotion/styled";
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { async } from "q";

const PageContainer = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: darkSlateGray;
  padding-bottom: 30px;
  color: white;
`;
const TitleContainer = styled.div`
  margin-top: 20px;
  height: 10vh;
  width: 50vw;
  font-size: 20px;
`;

const CardsContainer = styled.div`
  height: 100%;
  width: 90vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 10vw;
  gap: 20px;
`;
interface PokemonType {
    name:string
}
interface PokemonTypes {
    slot:number;
    type:PokemonType[]
}

interface PokemonDetails {
  abilities?: {
    ability?: {};
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms?: {}[];
  game_indices?: {}[];
  held_items?: {}[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves?: {}[];
  name: string;
  pastTypes?: {}[];
  species?: {}[];
  sprites?: {}[];
  stats?: {}[];
  types?: PokemonTypes[] | any[];
  weight: number;
}

export default function Home() {
  const [offSet, setOffSet] = useState(0);
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);

  async function getPokemonDetails(url: string): Promise<any> {
    const res = await axios.get(url).then((resp) => {
      //   console.log(resp);

      //   console.log(resp.data, "INI POKEMON DETAIL")

      return resp.data;
    });

    return res;
  }

  useEffect(() => {
    async function fetchPokemons() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=20`)
        .then(async(resp) => {
          

          const pokemons = resp.data.results;

          let pokemonArr =await Promise.all(pokemons.map(async (pokemon: any) => {
            let pokemonDetails = await getPokemonDetails(pokemon.url);
            // console.log(pokemonDetails, "pokemonDetails in foreach")
            return pokemonDetails
          })) 
          console.log(pokemonArr, "pokemonArr");

          setPokemonList([...pokemonList, ...pokemonArr]);
        })

        .catch((err) => {
          console.log(err);
        });
    }
    fetchPokemons();
  }, []);

  let mappedPokemonData = pokemonList.map((el:PokemonDetails) => {
    if(el.types !== undefined)
    return {
        name:el.name,
        type:el.types.map((e) => e.type.name)
    }
})

  return (
    <PageContainer>
      <TitleContainer>Pokedex</TitleContainer>
      <CardsContainer>
        {JSON.stringify(mappedPokemonData)}
        <PokemonCard></PokemonCard>
        <PokemonCard></PokemonCard>
        <PokemonCard></PokemonCard>
        <PokemonCard></PokemonCard>
        <PokemonCard></PokemonCard>
        <PokemonCard></PokemonCard>
      </CardsContainer>
    </PageContainer>
  );
}
