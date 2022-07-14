import { useState, useEffect } from "react";
import axios from "axios";
import { ObjectType } from "typescript";
import { TypeRow } from "./components/TypeRow";
import TYPE_COLORS from "./lib/typeColors";
import PokemonCard from "./components/PokemonCard";
import { PokemonCardProps } from "./components/PokemonCard";
import TypeChart from "./components/TypeChart";
import AutoComplete from "./components/AutoComplete";

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

  const axios = require("axios").default;
  const [url, setUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );
  const [nextUrl, setNextUrl] = useState<string>("");
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [pokeUrl, setPokeUrl] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonList | null>(null);
  const [selectedPoke, setSelectedPoke] = useState<PokemonCardProps | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [pokeLoading, setPokeLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<any[]>([]);

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
      // console.log(pokeData);
      setSelectedPoke(pokeData);
      setPokeLoading(false);
    } catch (e: any) {
      console.error(e);
    }
  };

  // const getType: any = async (url: string) => {
  //   try {
  //     const typeResponse = await axios.get(url);
  //     // console.log(typeResponse);
  //     const typeData = typeResponse.data;
  //     console.log(typeData);
  //     return typeData;
  //     // setTypes(typeData);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // build array of all types and their stats
  const getAllTypes: any = async () => {
    // let testArr = [];
    for (let i = 1; i <= 18; i++) {
      try {
        const typeResponse = await axios.get(
          `https://pokeapi.co/api/v2/type/${i}`
        );
        const typeData = typeResponse.data;
        // console.log(typeData);
        // testArr.push(testData);

        // push if testData.id is not in types
        if (!types.some((el) => el.id === typeData.id)) {
          types.push(typeData);
        }

        // types.push(testData);
      } catch (e) {
        console.error(e);
      }
    }
    // console.log(testArr);
    // console.log(types);
    // return types;
  };

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
    getAllTypes();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 h-screen overflow-auto">
      <div className="header">
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
          <button
            onClick={getAllTypes}
            className=" bg-purple-400 p-4 rounded-md"
          >
            get types
          </button>
        </div>
      </div>

      <TypeChart />

      <div className="poke-list flex gap-8">
        <div className="bg-slate-600 m-auto flex flex-col gap-2 p-4 text-white rounded-lg h-[60vh] w-96">
          <input
            className="text-black"
            type="text"
            placeholder="search for a poke"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />

          {pokemonData && <AutoComplete data={pokemonData!.results} />}
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

        <div className="poke-card bg-slate-600 m-auto flex flex-col gap-2 p-4 text-white rounded-lg overflow-auto h-[60vh] w-96">
          {selectedPoke ? (
            <PokemonCard {...selectedPoke} />
          ) : (
            <p>{pokeLoading ? "Loading..." : "no poke 😢"}</p>
          )}
        </div>
      </div>
    </div>
  );
};
