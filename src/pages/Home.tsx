import styled from "@emotion/styled";
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { event } from "jquery";
import TypeSelection from "../components/TypesSelection";
import Modal from "react-modal";

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
  width: 80vw;
  font-size: 20px;
  display: flex;
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

const AppLogoBlack = styled.div({
  color: "#61DBFB",
  backgroundColor: "black",
  borderRadius: "0px",
  height: "30px",
  padding: "5px",
  borderTopLeftRadius: "10px",
  borderBottomLeftRadius: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  fontWeight: "600",
});
const AppLogoYellow = styled.div({
  color: "black",
  backgroundColor: "#fff600",
  borderTopRightRadius: "10px",
  borderBottomRightRadius: "10px",
  height: "30px",
  padding: "5px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  fontWeight: "600",
});

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
    ability?: {
      name?:string
    };
    is_hidden: boolean;
    slot: number;
  }[];
  height:number;
  base_experience?: number;
  forms?: {}[];
  game_indices?: {}[];
  held_items?: {}[];
  id?: number;
  is_default?: boolean;
  location_area_encounters?: string;
  moves?: {
    move?: {
      name?:string
    };
  }[];
  name: string;
  pastTypes?: {}[];
  species?: {}[];
  sprites?: {}[];
  stats?: {
    base_stat:number;
    stat:{
      name:string
    }
  }[];
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

  const [isModalOpen, setModalOpen] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>({
    name: "",
    weight: 0,
    height:0
  });

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

          
          let pokemonArr = await Promise.all(
            pokemons.map(async (pokemon: any) => {
              let pokemonDetails = await getPokemonDetails(pokemon.url);
          
              return pokemonDetails;
            })
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

  function openModal(id: number) {
    setModalOpen(true);
    const clickedPokemon = pokemonList.find((el) => el.id === id);
    clickedPokemon && setPokemonDetails(clickedPokemon);

  }

  function closeModal() {
    setModalOpen(false);
  }

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
    const value = event.target.value;
    setSelectedPokemonType(value);
  };

  return (
    <PageContainer>
      <TitleContainer>
        <AppLogoBlack>
          <img
            alt="pokeball"
            height={"25px"}
            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/770px-Pok%C3%A9_Ball_icon.svg.png`}
          ></img>
          React
        </AppLogoBlack>
        <AppLogoYellow>Pokedex</AppLogoYellow>
      </TitleContainer>
      <TypeSelection
        currentSelectedType={selectedPokemonType}
        pokemonTypes={pokemonTypes}
        handleSelect={handleSelect}
      ></TypeSelection>
      <Modal
        isOpen={isModalOpen}
        style={{
          content: {
            top: "0%",
            left: "50%",
            right: "50%",
            bottom: "-10%",
            marginRight: "-50%",
            marginTop: "20%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "darkslategray",
            borderRadius: "10px",
            gap:'20px'
          },
        }}
        onRequestClose={closeModal}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <PokemonCard
            key={pokemonDetails?.id}
            id={pokemonDetails?.id}
            name={pokemonDetails?.name}
            types={
              pokemonDetails.types &&
              pokemonDetails?.types.map((e) => e.type.name)
            }
            onClick={() => {}}
          ></PokemonCard>
          <button
            style={{
              backgroundColor: "firebrick",
              color: "mintcream",
              fontSize: "15px",
              fontWeight: "600",
              borderRadius: "9px",
              height: "30px",
            }}
            onClick={closeModal}
          >
            Close
          </button>
          
        </div>
        <div
          style={{
            backgroundColor:'wheat',
            height:'90%',
            width:'60%',
            borderRadius:'10px',
            display:'flex',
            flexDirection:'column',
            padding:'10px',
            fontWeight:'600',
            fontSize:'16px',
            gap:'10px'

          }}
          >
            <div>Base Exp: {pokemonDetails.base_experience} </div>
            <div>Weight: {pokemonDetails.weight/10}kg </div>
            <div>Height: {pokemonDetails.height/10}m </div>
            <div>Abilities:  {pokemonDetails.abilities && pokemonDetails.abilities.map((el) =>el.ability&& el.ability.name&&  el.ability.name.split('-').map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join(" ")).join(", ")}</div>
            {/* <div>Moves:  </div>
            <div style={{
              overflowX:'hidden',
              height:'40px',
              wordWrap:'break-word',
              color:'mintCream',
              backgroundColor:'darkslategray',
              padding:'4px',
             
              
            }}>{pokemonDetails.moves && pokemonDetails.moves.map((el) =>el.move&& el.move.name&&  el.move.name.split('-').map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join(" ")).join(", ")}</div> */}
            {pokemonDetails.stats && pokemonDetails.stats.map((el) => (
              <div>{el.stat.name.split('-').map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join(" ")} : {el.base_stat}</div>
            ))}
          </div>

      
      </Modal>
      <InfiniteScroll
        dataLength={mappedPokemonData.length + 1}
        next={fetchPokemons}
        hasMore={offSet < totalPokemonCount ? true : false}
        loader={
          <p>
            Loading more pokemon...{" "}
            <img
              alt="pokeball"
              height={"25px"}
              src={`https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/770px-Pok%C3%A9_Ball_icon.svg.png`}
            ></img>
          </p>
        }
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
                onClick={openModal}
              ></PokemonCard>
            ))}
        </CardsContainer>
      </InfiniteScroll>
    </PageContainer>
  );
}
