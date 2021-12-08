import HeaderRow from "./layout/HeaderRow";

const DevelopmentThemeHeader = ({ theme, location }: { theme: string; location: string }) => {
  return (
    <HeaderRow
      title={`De ontwikkeling van ${theme} in ${location === "Amsterdam" ? location : `${location} en Amsterdam`}`}
    />
  );
};

export default DevelopmentThemeHeader;
