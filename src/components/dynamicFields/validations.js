export const validateName = (value) => {
    if (!value) return "Name is required";
    if (!/^[A-Za-z\s]+$/.test(value)) return "Only letters and spaces allowed";
    return undefined;
  };
  
  export const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
    return undefined;
  };
  
  export const validatePhone = (value) => {
    if (!value) {
      return "Phone number is required";
    }
  
    const countryCodePattern = /^\+\d{1,3}[-.\s]?/;
    if (!countryCodePattern.test(value)) {
        return "Include country code with a space";
    }
  
    const numberWithoutCode = value.replace(countryCodePattern, "");
  
    if (!/^\d{10}$/.test(numberWithoutCode)) {
      return "Must be exactly 10 digits";
    }
  
    if (/^[012]/.test(numberWithoutCode)) {
      return "Cannot start with 0 or 1 or 2 ";
    }
  
    return undefined;
  };
  
  

  export const validateSkills = (value) => {
    if (!value || value.length === 0) return "Please select at least one skill";
    return undefined;
  };

  export const validateTerms = (value) => {
    if (!value) return "You must accept the Terms & Conditions";
    return undefined;
  };
  