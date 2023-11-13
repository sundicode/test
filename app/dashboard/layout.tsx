import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";
type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <Container>
      <Navbar />
      <div className="w-full flex p-4">
        <div className="w-[15%]">
          <Sidebar />
        </div>
        <div className="w-[85%] p-4">{children}</div>
      </div>
    </Container>
  );
};

export default layout;
