import GGWHeader from "./GGWHeader";

const PageTemplate = ({ children }) => {
  return (
    <>
      <GGWHeader />
      {children}
    </>
  );
};

export default PageTemplate;
