import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/PokemonImage";


export default component$(() => {

  const pokemonId = useSignal(1);
  const backImage = useSignal(false);
  const reveal = useSignal(true);

  const handleClickAdd = $(() => {
    if (pokemonId.value + 1 >= 182) return;
    pokemonId.value++
  });

  const handleClickSub = $(() => {
    if (pokemonId.value - 1 <= 0) return;
    pokemonId.value--
  });

  const handleClickShowFrontToggle = $(() => backImage.value = !backImage.value)
  const handleClickRevealToggle = $(() => reveal.value = !reveal.value)

  return (
    <>
      <div class="grid place-items-center gap-5">
        <span class="text-5xl">Buscador simple</span>
        <span class="text-5xl">{pokemonId}</span>


        <PokemonImage id={pokemonId.value} backImage={backImage.value} brightness={reveal.value} />

        <div class="flex flex-row justify-center items-center gap-5">
          <button onClick$={handleClickSub} class="btn btn-primary ">Anterior</button>
          <button onClick$={handleClickAdd} class="btn btn-primary ">Siguiente</button>
        </div>
        <div class="flex flex-row justify-center items-center gap-5">
          <button onClick$={handleClickShowFrontToggle} class="btn bg-blue-600 hover:bg-blue-700 active:bg-blue-800">Voltear</button>
          <button onClick$={handleClickRevealToggle} class="btn bg-green-600 hover:bg-green-700 active:bg-green-800">Revelar</button>
        </div>

      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Primera aplicación en qwik",
    },
  ],
};
