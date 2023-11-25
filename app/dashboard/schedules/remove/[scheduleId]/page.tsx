import React from "react";
const page = ({ params }: { params: { scheduleId: string } }) => {
  return <div>{params.scheduleId}</div>;
};

export default page;
