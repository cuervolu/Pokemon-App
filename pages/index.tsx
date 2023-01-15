'use client';
import { GetStaticPathsResult, GetStaticProps, GetStaticPaths } from 'next';
import { Grid } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokeAPIResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';
import { useState } from 'react';



interface Props {
  pokemons: SmallPokemon[];
}

export default function Home({ pokemons }: Props) {
  const [pokemon, setPokemon] = useState(pokemons);
  const fetchPokemon = async(url: string) => {
    const response = await fetch(url);
    const nextPokemon = await response.json()
    setPokemon(nextPokemon)

  }

  return (
    <Layout title='Listado de Pokemons'>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
          
        ))}
      </Grid.Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokeAPIResponse>(`/pokemon?limit=500`);

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i+ 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`,
  }));
  return {
    props: {
      pokemons: pokemons,
    },
  };
};

