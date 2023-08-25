import styled from "@emotion/styled"

const PageContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:20px;
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

const CardFrame = styled.div`
display:flex;
flex-direction:column;
gap:10px;
background-color: limeGreen;
width: 200px;
height: 300px;
border-radius:10px;
padding:15px;
`

const CardName = styled.div`
 width:95%;
 height:20px;
 background-color:wheat;
text-align:left;
color:#313638;
padding:3px;
border-radius:3px;
font-weight:600;

`

const PokemonImageFrame = styled.div`
width:93%;
background-color:wheat;
padding:4px;
display:flex;
flex-direction:row;
justify-content:center;
`

const PokemonType = styled.div`
 width:95%;
 height:40px;
 background-color:wheat;
text-align:left;
color:#313638;
padding:3px;
border-radius:3px;
font-weight:600;

`


export default function Home() {

    return <PageContainer>
        <TitleContainer>
        Pokedex
        </TitleContainer>
        <CardsContainer>
            <CardFrame>
                <CardName>Bulbasaur</CardName>
                <PokemonImageFrame>
                <img width={'100%'} src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/1.svg"></img>
                </PokemonImageFrame>
                <PokemonType>Type: Grass</PokemonType>
            </CardFrame>
            <CardFrame></CardFrame>
            <CardFrame></CardFrame>
            <CardFrame></CardFrame>
            <CardFrame></CardFrame>
            <CardFrame></CardFrame>
            <CardFrame></CardFrame>
            <CardFrame></CardFrame>
            
        </CardsContainer>

    </PageContainer>
}