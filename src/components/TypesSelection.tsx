import styled from "@emotion/styled";
import { colorBasedonTypes } from "../helpers/helpers";

const TypeSelector = styled.select<{color?:string}>`
    width:200px;
    
    border-style:solid;
    border-color:#1d2929;
    border-width:2px;
    border-radius:10px;
    font-size:17px;
    font-weight:600;
    color:${p => (p.color && p.color=='brown' ?`darkSlateGray`: 'mintCream' )};
    padding:5px;
    background-color:${p => (p.color && p.color!=='brown' ?`${p.color}`: 'none' )};
    

`;

const TypeOption = styled.option`
    background-color:white;
    color:darkSlateGray;
`;

const SelectorInnerContainer = styled.div`
display:flex;
flex-direction:row;
gap:20px;
align-items:center;
`

const SelectorContainer = styled.div`
    display:flex;
    flex-direction:row;
    width:67%;
    color:mintCream;
    justify-content:flex-end;
    align-items:center;
    gap:20px;
    font-size:18px;
    font-weight:600;
`

interface PokemonType {
    name:string | undefined
}
interface TypeSelectionProps {
    pokemonTypes: PokemonType[];
    handleSelect(event:any):any;
    currentSelectedType:string;
   
   
  }
export default function TypeSelection(props:TypeSelectionProps) {
    let color = colorBasedonTypes(props.currentSelectedType)

  return (
    <SelectorContainer>
         {/* <div>Click a card to see details</div> */}
        
       <SelectorInnerContainer><div>Filter by the Pokemon's type</div> <TypeSelector color={color} defaultValue={"none"} onChange={(e) => props.handleSelect(e)}>
        <TypeOption value={"none"}>All</TypeOption>
        {props.pokemonTypes.length > 0 &&
          props.pokemonTypes.map(
            (e, i) =>
              e.name !== "unknown" &&
              e.name !== "shadow" && (
                <TypeOption key={i} value={e.name}>
                  {e.name !==undefined &&  e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                </TypeOption>
              )
          )}
      </TypeSelector></SelectorInnerContainer>
     
    </SelectorContainer>
  );
}
