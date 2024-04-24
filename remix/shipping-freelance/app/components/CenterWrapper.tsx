import React from "react";

const CustomCenterWrapper: React.FC<{
  children: React.ReactNode;
  padding?: string;
  width?: string;
}> = ({ children, padding = "0px", width = "100%" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Ensure full viewport height
        padding,
        width,
        boxSizing: "border-box", // Include padding in the width calculation
      }}
    >
      {children}
    </div>
  );
};

export default CustomCenterWrapper;
