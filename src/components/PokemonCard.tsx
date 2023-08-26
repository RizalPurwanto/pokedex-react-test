import styled from "@emotion/styled";
import { colorBasedonTypes } from "../helpers/helpers";
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
  cursor:pointer;
`;

const CardName = styled.div`
  width: 95%;
  height: 20px;
  background-color: wheat;
  text-align: left;
  color: #313638;
  padding: 5px;
  border-radius: 5px;
  font-weight: 600;
  border-style:solid;
  border-width:1px;
  border-color:#1d2929;
  overflow:hidden;
`;

const PokemonImageFrame = styled.div`
  width: 93%;
  height:62%;
  background-color: wheat;
  padding: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius:10px;
  border-style:solid;
  border-width:1px;
  border-color:#1d2929;
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
  border-width:1px;
  border-color:#1d2929;
`;

interface PokemonCardProps {
  id: number | undefined;
  name: string | undefined;
  types: string[] | undefined;
 onClick(id:number):any
}

export default function PokemonCard(props: PokemonCardProps) {
 

  let frameColor = "brown";
  if (props.types !== undefined) {
    frameColor = colorBasedonTypes(props.types[0]);
  }

  let pokename = ''
  if(props.name !== undefined) {
   pokename= props.name.split('-').map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join(" ")
  }

  return (
  <a>
  <CardFrame onClick={(e) => {
    e.preventDefault() 
    props.id && props.onClick(props.id)
  }} color={frameColor}>
      <CardName >
        {/* {props.name !== undefined && 
          props.name?.charAt(0).toUpperCase() + props.name?.slice(1)} */}
          {pokename}
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
  </a>
  
  );
}
