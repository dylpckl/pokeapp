import React, { useEffect, useState } from "react";
import TYPE_COLORS from "../lib/typeColors";
import { TYPES } from "../lib/pokemonTypes";

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
      // console.log(type.name + ': 2x vs '+doubleDamageToArr);
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
      <div className="bg-white flex text-sm">
        {TYPES.map((type: any) => {
          if (
            damage_relations.double_damage_to.some((t: any) => t.name === type)
          ) {
            return (
              <p
                className="bg-green-300 p-4 w-10 h-10 flex items-center justify-center border-2 border-black"
                key={type.name}
              >
                2x
              </p>
            );
          } else if (
            damage_relations.half_damage_to.some((t: any) => t.name === type)
          ) {
            return (
              <p
                className="bg-red-300 p-4 w-10 h-10 flex items-center justify-center border-2 border-black"
                key={type.name}
              >
                .5x
              </p>
            );
          } else if (
            damage_relations.no_damage_to.some((t: any) => t.name === type)
          ) {
            return (
              <p
                className="bg-black p-4 w-10 h-10 flex items-center justify-center text-white border-2 border-white"
                key={type.name}
              >
                0x
              </p>
            );
          }
          return (
            <p
              className="bg-white p-4 w-10 h-10 flex items-center justify-center border-2 border-black"
              key={type.name}
            >
              1x
            </p>
          );
        })}
      </div>
    </div>
  );
}
