import ContentLoader from "react-content-loader";

const Loader = props => (
    <ContentLoader
      height={450}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="18.5" y="10.27" rx="0" ry="0" width="264" height="157" /> 
      <rect x="22.5" y="192.27" rx="0" ry="0" width="267" height="34" /> 
      <rect x="26.5" y="240.27" rx="0" ry="0" width="245" height="23" /> 
      <rect x="27.5" y="279.27" rx="0" ry="0" width="240" height="5" /> 
      <rect x="27.5" y="282.27" rx="0" ry="0" width="240" height="5" /> 
      <rect x="27.5" y="285.27" rx="0" ry="0" width="240" height="5" /> 
      <rect x="27.5" y="288.27" rx="0" ry="0" width="240" height="5" /> 
      <rect x="28.5" y="318.27" rx="0" ry="0" width="82" height="48" /> 
      <rect x="111.5" y="320.27" rx="0" ry="0" width="85" height="45" />
    </ContentLoader>
  );

  export default Loader;
