import React, { useState } from "react";
import axios from "axios";
import { TypeRow } from "./TypeRow";
import { TYPES } from "../lib/pokemonTypes";
import TYPE_COLORS from "../lib/typeColors";

function TypeChart() {
  const [types, setTypes] = useState<any>([]);
  const getAllTypes: any = async () => {
    let typeArr = [];
    for (let i = 1; i <= 18; i++) {
      try {
        const typeResponse = await axios.get(
          `https://pokeapi.co/api/v2/type/${i}`
        );
        const typeData = typeResponse.data;
        // push if testData.id is not in types
        if (!types.some((el: any) => el.id === typeData.id)) {
          typeArr.push(typeData);
        }
      } catch (e) {
        console.error(e);
      }
    }
    // console.log(types);
    setTypes(typeArr);
  };

  React.useEffect(() => {
    getAllTypes();
  }, []);

  return (
    <div>
      <div className="flex text-sm">
        {TYPES.map((type: any) => (
          <p style={{ backgroundColor: TYPE_COLORS[type] }} key={type}>
            {type}
          </p>
        ))}
      </div>
      <div>
        {types.map((type: any) => (
          <TypeRow {...type} />
        ))}
      </div>
    </div>
  );
}

export default TypeChart;
