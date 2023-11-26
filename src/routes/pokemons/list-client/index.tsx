import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <p>Hola mundo - List Client</p>
});

export const head: DocumentHead = {
  title: "List Client",
  meta: [
    {
      name: "description",
      content: "Lista del lado del cliente",
    },
  ],
};
