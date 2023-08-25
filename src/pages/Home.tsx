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
background-color:grey;
width: 200px;
height: 300px;
border-radius:10px;
`


export default function Home() {

    return <PageContainer>
        <TitleContainer>
        Pokedex
        </TitleContainer>
        <CardsContainer>
            <CardFrame></CardFrame>
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