import React from "react";

const ShadowedCard = ({ children, index, step }) => {
  return <div className="shadow-md border p-4 rounded-sm">
    <div className="flex items-center border-b pb-3 gap-2 mb-4">
        <span className="bg-[var(--color-base-300)] text-xs rounded-sm px-2 py-1">{index}</span>
        <span className="font-bold">{step}</span>
    </div>
    {children}</div>;
};

export default ShadowedCard;
