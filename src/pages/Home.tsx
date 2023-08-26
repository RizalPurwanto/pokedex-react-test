import styled from "@emotion/styled";
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { event } from "jquery";
import TypeSelection from "../components/TypesSelection";

const PageContainer = styled.div`
  height: 120%;
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
  name: string;
}
interface PokemonTypes {
  slot: number;
  type: PokemonType[];
}

interface Type {
  name: string;
  url: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonTypes, setPokemonTypes] = useState<Type[]>([]);
  const [selectedPokemonType, setSelectedPokemonType] = useState("none");
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);

  //   const handleScroll = () => {

  //       console.log(window.innerHeight + document.documentElement.scrollTop, `window.innerHeight + document.documentElement.scrollTop`)
  //       console.log(document.documentElement.offsetHeight, `document.documentElement.offsetHeight`)
  //       if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight+17 || isLoading) {
  //         return;
  //       }
  //       fetchPokemons();
  //     };

  async function getPokemonDetails(url: string): Promise<any> {
    const res = await axios.get(url).then((resp) => {
      return resp.data;
    });

    return res;
  }
  async function fetchTypes() {
    setIsLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/type`)
      .then(async (resp) => {
        const types = resp.data.results;
        console.log(types, "ini types");
        setPokemonTypes(types);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function fetchPokemons() {
    setIsLoading(true);
    console.log("..fetching Pokemon...");

    let limit = 100;
    if (offSet <= totalPokemonCount) {
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`
        )
        .then(async (resp) => {
          const pokemons = resp.data.results;
          const totalPokemons = resp.data.count;
          setTotalPokemonCount(totalPokemons);

          console.log(resp.data);
          let pokemonArr = await Promise.all(
            pokemons.map(async (pokemon: any) => {
              let pokemonDetails = await getPokemonDetails(pokemon.url);
              // console.log(pokemonDetails, "pokemonDetails in foreach")
              return pokemonDetails;
            })
          );
          console.log(
            pokemonArr,
            `pokemonArr https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${20}`
          );

          setPokemonList([...pokemonList, ...pokemonArr]);
          setOffSet(offSet + limit);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
          console.log("....fetching finished");
        });
    }
  }

  useEffect(() => {
    fetchPokemons();
  }, [selectedPokemonType]);

  useEffect(() => {
    fetchTypes();
    fetchPokemons();
  }, []);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isLoading]);

  let mappedPokemonData = pokemonList.map((el: PokemonDetails) => {
    if (el.types !== undefined)
      return {
        id: el.id,
        name: el.name,
        type: el.types.map((e) => e.type.name),
      };
  });
  if (selectedPokemonType !== "none") {
    mappedPokemonData = mappedPokemonData.filter((el) =>
      el?.type.some((e) => e == selectedPokemonType)
    );
  }

  const handleSelect = (event: any) => {
    event.preventDefault();
    console.log(event.target.value, "INI VALUE SELECTION");
    const value = event.target.value;
    setSelectedPokemonType(value);
  };

  return (
    <PageContainer>
      <TitleContainer>Pokedex</TitleContainer>
      <TypeSelection
      currentSelectedType={selectedPokemonType}
        pokemonTypes={pokemonTypes}
        handleSelect={handleSelect}
      ></TypeSelection>
      <InfiniteScroll
        dataLength={mappedPokemonData.length + 1}
        next={fetchPokemons}
        hasMore={offSet < totalPokemonCount ? true : false}
        loader={<p>Loading more pokemon...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <CardsContainer>
          {mappedPokemonData &&
            mappedPokemonData.map((el) => (
              <PokemonCard
                key={el?.id}
                id={el?.id}
                name={el?.name}
                types={el?.type}
              ></PokemonCard>
            ))}
        </CardsContainer>
      </InfiniteScroll>
      {/* <CardsContainer>
         
          {mappedPokemonData &&
            mappedPokemonData.map((el) => (
              <PokemonCard
              key={el?.id}
                id={el?.id}
                name={el?.name}
                types={el?.type}
              ></PokemonCard>
            ))}
        </CardsContainer> */}
    </PageContainer>
  );
}
