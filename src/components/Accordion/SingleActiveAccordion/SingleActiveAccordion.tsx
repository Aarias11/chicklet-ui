import React, { useState } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[]; // Accepts an array of accordion items
  allowMultiple?: boolean; // Allow multiple panels open
  customStyles?: string; // Custom styles for the wrapper
  iconUp?: React.ReactNode; // Custom icon for open state
  iconDown?: React.ReactNode; // Custom icon for closed state
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  customStyles = "",
  iconUp = <IconChevronUp size={20} stroke={2} />,
  iconDown = <IconChevronDown size={20} stroke={2} />,
}) => {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    setExpandedIndices((prev) => {
      if (allowMultiple) {
        return prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index];
      } else {
        return prev.includes(index) ? [] : [index];
      }
    });
  };

  return (
    <div className={`w-[300px] text-[14px] flex flex-col gap-4 ${customStyles}`}>
      {items.map((item, index) => {
        const isOpen = expandedIndices.includes(index);

        return (
          <div key={index} className="border-b border-gray-600 pb-2">
            {/* Accordion Header */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-gray-200">{item.title}</span>
              {isOpen ? iconDown : iconUp}
            </div>

            {/* Accordion Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="mt-2 text-gray-500">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;