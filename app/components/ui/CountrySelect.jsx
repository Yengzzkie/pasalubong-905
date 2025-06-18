import React from "react";
import { useCountries } from "use-react-countries";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export default function CountrySelect({ formData, setFormData }) {
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const { name, flags, countryCallingCode } = countries[country];

  return (
    <div className="relative flex w-full max-w-[24rem] mt-[2px]]">
      <Menu placement="bottom-start">
        <MenuHandler>
          <Button
            ripple={false}
            variant="text"
            color="blue-gray"
            className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-[var(--color-base-300)] bg-[var(--color-base-200)] pl-3"
          >
            <img
              src={flags.svg}
              alt={name}
              className="h-4 w-4 rounded-full object-cover"
            />
            {countryCallingCode}
          </Button>
        </MenuHandler>
        <MenuList className="max-h-[20rem] max-w-[18rem] overflow-scroll">
          {countries
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ name, flags, countryCallingCode }, index) => {
              return (
                <MenuItem
                  key={name}
                  value={name}
                  className="flex items-center gap-2"
                  onClick={() => setCountry(index)}
                >
                  <img
                    src={flags.svg}
                    alt={name}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  {name} <span className="ml-auto">{countryCallingCode}</span>
                </MenuItem>
              );
            })}
        </MenuList>
      </Menu>
      <Input
        type="tel"
        placeholder="Mobile Number"
        className="rounded-l-none rounded-r-[5px] focus:!border-t-gray-900 border-[var(--color-base-300)]"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "min-w-0",
        }}
        onChange={(event) => setFormData({ ...formData, location: {country: name}, mobile: `${countryCallingCode} ${event.target.value}` })}
      />
    </div>
  );
}
