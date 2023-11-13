import React from "react";

const Single = ({ params }: { params: { matricule: string } }) => {
  console.log(params.matricule);

  return <div></div>;
};

export default Single;
