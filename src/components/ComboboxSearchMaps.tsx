"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

type ComboboxSearchMaps = {
  currentUserPosition: {
    lat: number;
    lng: number;
  };
};

export default function ComboboxSearchMaps({
  currentUserPosition,
}: ComboboxSearchMaps) {
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: mapsKey,
  });

  return (
    <Combobox
      as="div"
      value={selectedPlace}
      onChange={(evt) => {
        if (!evt) return;
        setSelectedPlace(evt);
      }}
      className="z-100"
    >
      <Label className="block text-sm/6 font-medium text-gray-900">
        Busque pelo local
      </Label>
      <div className="relative mt-2">
        <ComboboxInput
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          onChange={(event) => {
            getPlacePredictions({
              input: event.target.value,
              locationBias: { ...currentUserPosition },
              language: "pt-br",
              region: "br",
            });
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          displayValue={(place: any) => place?.description}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>

        {!!placePredictions.length && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {placePredictions.map((place) => (
              <ComboboxOption
                key={place.description}
                value={place}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
              >
                <span className="block truncate group-data-[selected]:font-semibold">
                  {place.description}
                </span>

                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
}
