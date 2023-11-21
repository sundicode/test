import React from "react";
import { BiChevronRight, BiUpload } from "react-icons/bi";

const Setting = () => {
  return (
    <div>
      <h1 className=" text-3xl font-semibold flex items-center">
        Option <BiChevronRight className="text-login-bg" /> Settings
      </h1>
      <div className="w-full h-[1px] bg-light"></div>

      <div>
        <div>
          <label htmlFor="photo" className=" cursor-pointer">
            <BiUpload />
          </label>
          <input type="file" name="photo" className="" />
        </div>
        <div>
          <div>
            <input type="text" className="" placeholder="Office Post" />
          </div>

          <div>
            <input type="text" className="" placeholder="Address" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
