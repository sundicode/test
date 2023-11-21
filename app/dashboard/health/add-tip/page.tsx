"use client";
import Button from "@/components/Button";
import { useState } from "react";

const CreateHealthTip = () => {
  const [value, setValue] = useState("");
  return (
    <form>
      <Button>Create Post</Button>
    </form>
  );
};

export default CreateHealthTip;
