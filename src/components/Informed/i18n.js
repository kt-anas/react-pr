import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      firstName: "First Name",
      lastName: "Last Name",
      street: "Street",
      city: "City",
      pincode: "Pincode",
      phone: "Phone",
      state: "State",
      district: "District",
      messages: "Messages",
      selectState: "Select a state",
      selectDistrict: "Select a district",
      submit: "Submit",
      interests: "Interests",
      sports: "Sports",
      music: "Music",
      travel: "Travel",
      selectAtLeastOne: "Please select at least one interest",
      chooseFile: "Choose File",
      uploadFile: "Upload File",
      messages: "Messages",
    },
  },
  hi: {
    translation: {
      firstName: "पहला नाम",
      lastName: "उपनाम",
      street: "गली",
      city: "शहर",
      pincode: "पिन कोड",
      phone: "फोन",
      state: "राज्य",
      district: "जिला",
      messages: "संदेश",
      selectState: "राज्य चुनें",
      selectDistrict: "जिला चुनें",
      submit: "प्रस्तुत करें",
      interests: "रुचियां",
      sports: "खेल",
      music: "संगीत",
      travel: "यात्रा",
      selectAtLeastOne: "कृपया कम से कम एक रुचि चुनें",
      chooseFile: "फ़ाइल चुनें",
      uploadFile: "फ़ाइल अपलोड करें",
      messages: "संदेश",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
