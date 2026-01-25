import React from "react";
import Levels from "./levels";

export default function page() {
  return (
    <div className="bg-[#04395E] h-auto min-h-[100vh] w-[100vw] flex flex-col justify-start items-center overflow-x-hidden">
      <Levels
        description={`learning to distinguish muscle from mashed potato can name three pressure points and pronounce "shiatsu" correctly`}
        level={"novice"}
        marginLeft={"0"}
      />
      <Levels
        description={
          "know their way around knots and can execute a mean forearm roll.Has stopped treating the spine like a xylophone"
        }
        level={"specialist"}
        marginLeft={"22"}
      />
      <Levels
        description={
          "The sage of soft tissue. Doesn't just treat symptoms—rewires the body's memory of pain. Expertise spans from injury rehabilitation to elite performance optimization, making them a strategic partner for long-term wellness."
        }
        level={"seasoned"}
        marginLeft={"45"}
      />
    </div>
  );
}
