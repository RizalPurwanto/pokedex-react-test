import styled from "@emotion/styled"
import PokemonCard from "../components/PokemonCard"

const PageContainer = styled.div`
    height:100%;
    width:100vw;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:20px;
    background-color:darkSlateGray;
    padding-bottom:30px;
    color:white;
`
const TitleContainer =styled.div`
margin-top:20px;
height:10vh;
width:50vw;
font-size:20px;
`

const CardsContainer = styled.div`
height:100%;
width:90vw;
display:flex;
flex-direction:row;
flex-wrap:wrap;
align-items:center;
margin-left:10vw;
gap:20px;
`


export default function Home() {

    return <PageContainer>
        <TitleContainer>
        Pokedex
        </TitleContainer>
        <CardsContainer>
            <PokemonCard></PokemonCard>
            <PokemonCard></PokemonCard>
            <PokemonCard></PokemonCard>
            <PokemonCard></PokemonCard>
            <PokemonCard></PokemonCard>
            <PokemonCard></PokemonCard>
           
            
        </CardsContainer>

    </PageContainer>
}