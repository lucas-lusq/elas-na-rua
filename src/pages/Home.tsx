import { PlusIcon } from "@heroicons/react/20/solid";
import { PageState } from "../utils/app-state.type";

interface HomeProps {
  goToPage: (page: PageState) => void;
}

export default function Home({ goToPage }: HomeProps) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className=" text-lg font-semibold text-indigo-600">Bem vinda</p>
          <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            novo evento
          </h2>
          <button
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => goToPage("incident-moment-stage")}
          >
            <PlusIcon aria-hidden="true" className="h-5 w-5" />
          </button>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            {`Por favor, certifique-se de que está em um lugar seguro antes de
            continuar :)`}
          </p>
        </div>
      </div>
    </div>
  );
}
