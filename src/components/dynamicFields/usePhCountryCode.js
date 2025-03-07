import { useState, useEffect } from "react";

 
const countryData = [
  { label: "India", value: "in", code: "+91" },
  { label: "USA", value: "us", code: "+1" },
  { label: "UK", value: "uk", code: "+44" },
  { label: "Canada", value: "ca", code: "+1" },
];

export const usePhoneWithCountryCode = () => {
  const [selectedCountry, setSelectedCountry] = useState("in");  
  const [phone, setPhone] = useState("+91");  

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    const countryInfo = countryData.find((c) => c.value === newCountry);

    if (countryInfo) {
      setSelectedCountry(newCountry);
      setPhone(countryInfo.code); 
    }
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value;
    setPhone(input);

    const matchedCountry = countryData.find((c) => input.startsWith(c.code));

    if (matchedCountry) { 
         setSelectedCountry(matchedCountry.value);  
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
