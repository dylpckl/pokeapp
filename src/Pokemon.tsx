import { useState, useEffect } from "react";
import axios from "axios";

export const Pokemon = () => {
  interface PokemonList {
    count: number;
    next: string;
    previous?: any;
    results: {
      name: string;
      url: string;
    }[];
  }

  interface SinglePokemon {
    id: number;
    name: string;
    // base_experience: number;
    // height: number;
    // is_default: boolean;
    // order: number;
    // weight: number;
    // abilities:
    // forms:,
    game_indices: {
      version: {
        name: string;
        url: string;
      };
    }[];
    // held_items:,
    // location_area_encounters:,
    // moves:,
    // species:,
    sprites: {
      front_default: string;
    };
    // stats:,
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      }[];
    }[];
    // past_types
  }

  const axios = require("axios").default;
  const [url, setUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );
  const [nextUrl, setNextUrl] = useState<string>("");
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [pokeUrl, setPokeUrl] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonList | null>(null);
  const [selectedPoke, setSelectedPoke] = useState<SinglePokemon | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [pokeLoading, setPokeLoading] = useState<boolean>(false);

  const fetchData: any = async (id: undefined) => {
    try {
      const response = await axios.get(url);
      // console.log(response);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);

      const data: PokemonList | null = response.data;
      // console.log(data);
      setPokemonData(data);
    } catch (e: any) {
      setError(e.message);
      console.error(e);
    }
    setIsLoading(false);
  };

  // how to pass url as param?
  const fetchPoke: any = async (url: string) => {
    setPokeLoading(true);
    try {
      const pokeResponse = await axios.get(url);
      // console.log(pokeResponse);
      const pokeData = pokeResponse.data;
      console.log(pokeData);
      setSelectedPoke(pokeData);
      setPokeLoading(false);
    } catch (e: any) {
      console.error(e);
    }
  };

  // const handleGetPoke = (pokeUrl: string) => {
  //   setPokeUrl(pokeUrl);
  //   console.log(pokeUrl);
  //   fetchPoke(pokeUrl);
  // };

  const handleClick = (nextOrPrev: string) => {
    if (nextOrPrev === "next") {
      setUrl(nextUrl);
      // console.log(`${nextOrPrev} ` + url);
    } else if (prevUrl !== null) {
      setUrl(prevUrl);
    }
    fetchData(url);
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 w-screen h-screen">
      <div>
        <h1 className="mt-8 text-3xl">everyone needs to make a pokemon app</h1>
        <div className="flex gap-8">
          <button onClick={fetchData} className=" bg-purple-400 p-4 rounded-md">
            get the poeks
          </button>
          <button
            onClick={() => handleClick("next")}
            className=" bg-purple-400 p-4 rounded-md"
          >
            next
          </button>
          <button
            onClick={() => handleClick("prev")}
            className=" bg-purple-400 p-4 rounded-md"
          >
            prev
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="bg-slate-600 m-auto flex flex-col gap-2 p-4 text-white rounded-lg max-h-[80vh] w-[40vw]">
          <input
            className="text-black"
            type="text"
            placeholder="search for a poke"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <button onClick={() => setSearchText("")}>clear search</button>
          <div className="overflow-auto">
            <ul>
              {!isLoading ? (
                pokemonData &&
                pokemonData.results
                  .filter((val) => {
                    if (searchText === "") {
                      return val;
                    } else if (
                      val.name.toLowerCase().includes(searchText.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((pokemon: any) => (
                    <li key={pokemon.name}>
                      <button
                        onClick={() =>
                          fetchPoke(
                            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                          )
                        }
                      >
                        {pokemon.name}
                      </button>
                    </li>
                  ))
              ) : (
                <p>loading...</p>
              )}
            </ul>
          </div>
        </div>
        <div className="bg-slate-600 m-auto flex flex-col gap-2 p-4 text-white rounded-lg overflow-auto max-h-[80vh] w-[40vw]">
          {selectedPoke ? (
            <div>
              <p>{selectedPoke.name}</p>
              <img alt="poke sprite" src={selectedPoke.sprites.front_default} />

              <div>
                <h1 className="uppercase text-sm">types</h1>
                <div className="flex gap-2">
                  {selectedPoke.types.map((type: any) => (
                    <p
                      key={type.slot}
                      className="bg-red-300 p-2 w-fit rounded-md"
                    >
                      {type.type.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>{pokeLoading ? 'Loading...' : 'no poke 😢'}</p>
          )}
        </div>
      </div>
    </div>
  );
};
