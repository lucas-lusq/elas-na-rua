import { PageState } from "../utils/app-state.type";

interface IncidentMomentProps {
  goToPage: (page: PageState) => void;
}

export default function IncidentMoment({ goToPage }: IncidentMomentProps) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <a
        href="#"
        className="text-xl font-semibold text-indigo-600"
        onClick={() => {
          goToPage("home-stage");
        }}
      >
        <span aria-hidden="true">&larr;</span> voltar
      </a>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl mb-20">
            onde ocorreu o evento?
          </h2>
          <div
            className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6"
            onClick={() => goToPage("incident-picking")}
          >
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4 flex justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    localização atual
                  </h3>
                </div>
                <div>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 mt-12"
            onClick={() => goToPage("search-incident-location")}
          >
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4 flex flex-justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    outro local
                  </h3>
                </div>
                <div>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
