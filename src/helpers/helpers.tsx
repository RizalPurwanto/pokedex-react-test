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
      return "#313638";
    }

   if (type === "steel") {
      return "lightSteelBlue ";
    }
    
    if (type === "electric") {
      return "#FDDA0D";
    }

    if (type === "fire") {
      return "crimson ";
    }

    return "brown";
  };

  export {colorBasedonTypes}