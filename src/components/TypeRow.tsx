import React from "react";
import TYPE_COLORS from "../lib/typeColors";
import { TYPES } from "../lib/types";

interface TypeProps {
  name: string;
  id: number;
  damage_relations: {
    double_damage_from: {
      name: string;
      url: string;
    }[];
    double_damage_to: {
      name: string;
      url: string;
    }[];
    half_damage_from: {
      name: string;
      url: string;
    }[];
    half_damage_to: {
      name: string;
      url: string;
    }[];
    no_damage_from: {
      name: string;
      url: string;
    }[];
    no_damage_to: {
      name: string;
      url: string;
    }[];
  };
}

export function TypeRow({ id, name, damage_relations }: TypeProps) {
  const typeColor: string = TYPE_COLORS[name];
  let doubleDamageToArr: any[] = [];

  const DoubleDamageTo = damage_relations.double_damage_to.map(
    (type: { name: string; url: string }) => {
      doubleDamageToArr.push(type.name);
      console.log(type.name + ': 2x vs '+doubleDamageToArr);
      return (
        <li key={type.name}>
          <a href={type.url}>{type.name}</a>
        </li>
      );
    }
  );

  return (
    <div className="flex gap-8">
      <div key={id} style={{ backgroundColor: typeColor }} className="w-16">
        {name}
      </div>
      <div className="bg-white flex gap-4">
        {/* {DoubleDamageTo.length > 0 && DoubleDamageTo} */}
        {TYPES.map((type: string) => (
          // if (doubleDamageToArr.includes(type)) {
          //   <p className="">{type}</p>
          // }
          doubleDamageToArr.includes(type) && <p className="">{type}</p>
        ))}
      </div>
    </div>
  );
}
