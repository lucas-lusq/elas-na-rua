import ComboboxSearchMaps from "../components/ComboboxSearchMaps";
import { Coordinates, PageState } from "../utils/app-state.type";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

interface SearchForLocationProps {
  goToPage: (page: PageState) => void;
  setUserLocation: (userLocation: Coordinates) => void;
}

export default function SearchForLocation({
  goToPage,
  setUserLocation,
}: SearchForLocationProps) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <a
        href="#"
        className="text-xl font-semibold text-indigo-600"
        onClick={() => {
          goToPage("incident-moment-stage");
        }}
      >
        <span aria-hidden="true">&larr;</span> voltar
      </a>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl mb-20">
            onde ocorreu o evento?
          </h2>
          <ComboboxSearchMaps setUserLocation={setUserLocation} />
        </div>
      </div>
      <div className="flex justify-center mt-10 items-center">
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => goToPage("incident-picking")}
        >
          Continuar para o mapa
          <ArrowRightIcon aria-hidden="true" className="-mr-0.5 size-5" />
        </button>
      </div>
    </div>
  );
}
