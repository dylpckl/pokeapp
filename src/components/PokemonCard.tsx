import TYPE_COLORS from "../lib/typeColors";

export interface PokemonCardProps {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: {
    is_hiddnen: boolean;
    slot: number;
  }[];
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  held_items: {
    item: {
      name: string;
      url: string;
    };
  }[];
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      version_group: {
        name: string;
        url: string;
      };
      move_learn_method: {
        name: string;
        url: string;
      };
    };
  }[];
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string | null;
        front_female: string | null;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      official_artwork: {
        front_default: string | null;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: 0;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

function PokemonCard({ name, types, sprites }: PokemonCardProps) {
  return (
    <div>
      <p>{name}</p>
      <img alt="poke sprite" src={sprites.front_default} />

      <div>
        <h1 className="uppercase text-sm">types</h1>
        <div className="flex gap-2">
          {types.map((type: any) => (
            <p
              key={type.slot}
              style={{ backgroundColor: TYPE_COLORS[type.type.name] }}
              className="p-2 w-fit rounded-md"
            >
              {type.type.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
