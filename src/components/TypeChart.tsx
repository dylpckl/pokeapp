import React, { useState } from "react";
import axios from "axios";
import { TypeRow } from "./TypeRow";
import { TYPES } from "././../lib/types";

// 20 x 20 grid of types
// each type has a name and a color
// each type has a list of types it is double damage to
// each type has a list of types it is double damage from
// each type has a list of types it is half damage to
// each type has a list of types it is half damage from
// each type has a list of types it is no damage to
// each type has a list of types it is no damage from

// function Grid(): void {
//   for (let i = 0; i < 20; i++) {

//   }
//   return
// }

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
    console.log(types);
    setTypes(typeArr);
  };

  React.useEffect(() => {
    getAllTypes();
  }, []);

  return (
    <div>
      <div className="flex gap-2">
        {TYPES.map((type: string) => (
          <p className="">{type}</p>
        ))}
      </div>
      {types.map((type: any) => (
        <TypeRow {...type} />
      ))}
    </div>
  );
}

export default TypeChart;
