import { useState, useEffect } from "react";

// Country options with codes
const countryData = [
  { label: "India", value: "in", code: "+91" },
  { label: "USA", value: "us", code: "+1" },
  { label: "UK", value: "uk", code: "+44" },
  { label: "Canada", value: "ca", code: "+1" },
];

export const usePhoneWithCountryCode = () => {
  const [selectedCountry, setSelectedCountry] = useState("in"); // Default: India
  const [phone, setPhone] = useState("+91"); // Default: India code

  // Handle country selection (updates phone code)
  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    const countryInfo = countryData.find((c) => c.value === newCountry);

    if (countryInfo) {
      setSelectedCountry(newCountry);
      setPhone(countryInfo.code); // Set phone code based on selected country
    }
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value;
    setPhone(input);

    // Check if input starts with a known country code
    const matchedCountry = countryData.find((c) => input.startsWith(c.code));

    if (matchedCountry) {
      setSelectedCountry(matchedCountry.value); // Auto-select country
    }
  };

  return {
    selectedCountry,
    phone,
    handleCountryChange,
    handlePhoneChange,
    countryOptions: countryData.map(({ label, value }) => ({ label, value })),
  };
};
