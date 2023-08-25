import styled from "@emotion/styled";
const CardFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: limeGreen;
  width: 200px;
  height: 300px;
  border-radius: 10px;
  padding: 15px;
`;

const CardName = styled.div`
  width: 95%;
  height: 20px;
  background-color: wheat;
  text-align: left;
  color: #313638;
  padding: 3px;
  border-radius: 3px;
  font-weight: 600;
`;

const PokemonImageFrame = styled.div`
  width: 93%;
  background-color: wheat;
  padding: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
`;

export default function PokemonCard() {
  return (
    <CardFrame>
      <CardName>Bulbasaur</CardName>
      <PokemonImageFrame>
        <img
          width={"100%"}
          src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/1.svg"
        ></img>
      </PokemonImageFrame>
      <PokemonType>Type: Grass</PokemonType>
    </CardFrame>
  );
}
