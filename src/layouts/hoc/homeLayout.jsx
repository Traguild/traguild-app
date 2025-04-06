import React from "react";
import Layout from "layouts/home-layout";

const homeLayout = (Component) => {
  return (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

export default homeLayout;
