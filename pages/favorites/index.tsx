'use client';
import { useState, useEffect } from 'react';

import { Layout } from '../../components/layouts';
import { FavoritePokemons } from '../../components/pokemon';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';

export default function Favorites() {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title='Pokemons Favoritos'>
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemons={favoritePokemons} />
      )}
    </Layout>
  );
}
