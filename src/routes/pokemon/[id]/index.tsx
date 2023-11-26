import { component$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/PokemonImage';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = +params.id;

  if (isNaN(id) || id <= 0 || id > 1000)
    throw redirect(301, '/');

  return id
})

export default component$(() => {

  // const location = useLocation();
  const pokemonId = usePokemonId();

  return <div class="grid place-items-center gap-2">
    <h2>Pokémon {pokemonId}</h2>
    <PokemonImage id={pokemonId.value} brightness={false} />
  </div>
});