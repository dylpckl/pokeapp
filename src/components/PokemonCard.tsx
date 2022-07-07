import React from "react";

// interface

function PokemonCard({ pokemon }) {
  return (
    <div>
      <p>{pokemon.name}</p>
      <img alt="poke sprite" src={pokemon.sprites.front_default} />

      <div>
        <h1 className="uppercase text-sm">types</h1>
        <div className="flex gap-2">
          {pokemon.types.map((type: any) => (
            <p key={type.slot} className="bg-red-300 p-2 w-fit rounded-md">
              {type.type.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
