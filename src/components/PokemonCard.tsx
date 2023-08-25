import styled from "@emotion/styled";
const CardFrame = styled.div <{color?:string}>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${p => (p.color ?`${p.color}`: 'saddleBrown' )};
  width: 200px;
  height: 300px;
  border-radius: 10px;
  padding: 15px;
  border-color: #1d2929;
  border-width: 3px;
  border-style: solid;
`;

const CardName = styled.div`
  width: 95%;
  height: 20px;
  background-color: wheat;
  text-align: left;
  color: #313638;
  padding: 3px;
  border-radius: 5px;
  font-weight: 600;
  border-style:solid;
  border-width:1px;
  border-color:darkSlateGray;
`;

const PokemonImageFrame = styled.div`
  width: 93%;
  background-color: wheat;
  padding: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius:4px;
  border-style:solid;
  border-width:1px;
  border-color:darkSlateGray;
`;

const PokemonType = styled.div`
  width: 95%;
  height: 40px;
  background-color: wheat;
  text-align: left;
  color: #313638;
  padding: 3px;
  border-radius: 3px;
  font-weight: 600;
  border-style:solid;
  border-width:0.5px;
  border-color:darkSlateGray;
`;

interface PokemonCardProps {
  id: number | undefined;
  name: string | undefined;
  types: string[] | undefined;
}

export default function PokemonCard(props: PokemonCardProps) {
  const colorBasedonTypes = (type: string) => {
    if (type === "bug" || type === "grass") {
      return "forestGreen ";
    }
    
    if (type === "flying" || type === "normal") {
      return "BurlyWood  ";
    }

    if (type === "water" || type === "ice") {
      return "lightSeaGreen";
    }

    if (type === "dragon") {
      return "#DAA520";
    }

    if (type === "poison" || type === "psychic" || type === "ghost") {
      return "purple";
    }

    if (type === "rock" || type === "fighting" || type === "ground") {
      return "saddleBrown";
    }

    if (type === "fairy") {
      return "magenta";
    }

    if (type === "dark") {
      return "black";
    }

   if (type === "steel") {
      return "lightSteelBlue ";
    }
    
    if (type === "electric") {
      return "orange ";
    }

    if (type === "fire") {
      return "crimson ";
    }

    return "brown";
  };

  let frameColor = "brown";
  if (props.types !== undefined) {
    frameColor = colorBasedonTypes(props.types[0]);
  }

  return (
    <CardFrame color={frameColor}>
      <CardName>
        {props.name !== undefined &&
          props.name?.charAt(0).toUpperCase() + props.name?.slice(1)}
      </CardName>
      <PokemonImageFrame>
        <img
          width={"100%"}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`}
        ></img>
      </PokemonImageFrame>
      <PokemonType>
        Type:{" "}
        {props.types !== undefined &&
          props.types
            .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
            .join(", ")}
      </PokemonType>
    </CardFrame>
  );
}
