import { component$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { BasicPokemonInfo, PokemonListResponse } from '~/interfaces/pokemon-list.response';

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async () => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=10`);
  const data = await resp.json() as PokemonListResponse

  return data.results
})

export default component$(() => {

  const pokeResp = usePokemonList();

  return <>
    <div class="grid place-items-center gap-6">
      <div class="flex flex-col items-center gap-2">
        <span class="my-5 text-5xl">Status</span>
        <span >Página actual: </span>
        <span >Está cargando página: </span>
      </div>

      <div class="flex gap-4">
        <button class="btn btn-primary">Anteriores</button>
        <button class="btn btn-secondary">Siguientes</button>
      </div>

      <div class="mt-4 grid grid-cols-6 gap-4">
        {
          pokeResp.value.map(poke => <div key={poke.name} class="p-2 flex flex-col justify-center items-center bg-slate-800 text-white rounded-lg shadow-md shadow-teal-900">
            <h5>{poke.name}</h5>
          </div>)
        }
      </div>

      <pre>
        {
          JSON.stringify(pokeResp.value, null, 3)
        }
      </pre>
    </div>

  </>
});

export const head: DocumentHead = {
  title: "List SSR",
  meta: [
    {
      name: "description",
      content: "Lista del lado del servidor",
    },
  ],
};