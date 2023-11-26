import { $, Component, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";

type Props = {
  id: number,
  size?: number,
  backImage?: boolean,
  brightness?: boolean
}

export const PokemonImage: Component<Props> = component$(({ id, size = 100, backImage = false, brightness = true }) => {

  const isImgLoading = useSignal(true);
  const navigate = useNavigate()

  const handleImgLoaded = $(() => {
    setTimeout(() => {
      isImgLoading.value = false
    }, 400);
  })

  const handleClickGoToPokemon = $(async () => {
    await navigate(`/pokemon/${id}`)
  })

  useTask$(({ track }) => {
    track(() => id)
    isImgLoading.value = true;
  })

  return (
    <div class="grid place-items-center " style={{ width: `${size}px`, height: `${size}px` }}>
      <span class={`border-gray-300 h-10 w-10 animate-spin rounded-full border-4 border-t-blue-600 ${!isImgLoading.value ? 'hidden' : null}`} />

      {/* <Link href={`/pokemon/${id}/`}> */}
      <div onClick$={handleClickGoToPokemon} class="cursor-pointer">
        <img
          width={100} height={100}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${backImage ? `/back/${id}` : id}.png`}
          alt="pokemon-sprite"
          class={[{
            'hidden': isImgLoading.value,
            'brightness-0': brightness,
          }, 'transition-all']}
          onLoad$={handleImgLoaded}
        />
      </div>
      {/* </Link> */}
    </div>
  )
})