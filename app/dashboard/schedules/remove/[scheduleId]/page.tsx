import React from "react";
const DeleteSchedule = ({ params }: { params: { scheduleId: string } }) => {
  return <div>{params.scheduleId}</div>;
};

export default DeleteSchedule;
