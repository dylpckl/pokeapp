import React from "react";
import TYPE_COLORS from "../lib/typeColors";

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

  // iterate through the damage relations and create a list of the types
  const doubleDamageFrom = damage_relations.double_damage_from.map(
    (type: { name: string; url: string }) => {
      return (
        <li key={type.name}>
          <a href={type.url}>{type.name}</a>
        </li>
      );
    }
  );
  const DoubleDamageTo = damage_relations.double_damage_to.map(
    (type: { name: string; url: string }) => {
      return (
        <li key={type.name}>
          <a href={type.url}>{type.name}</a>
        </li>
      );
    }
  );

 
 
  return (
    <div className="flex gap-8">
      <div key={id} style={{ backgroundColor: typeColor }} className="">
        {name}
      </div>
      <div className="bg-white">
        {DoubleDamageTo.length > 0 && DoubleDamageTo}
        <p>test</p>
      </div>
    </div>
  );
}
