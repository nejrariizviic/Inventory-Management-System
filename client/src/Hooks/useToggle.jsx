import { useState } from "react";

export default function useToggle(toggleValue) {
  const [isOpen, setIsOpen] = useState(toggleValue);

  function toggle(isOpen) {
    setIsOpen((currentValue) =>
      typeof isOpen === "boolean" ? isOpen : !currentValue
    );
  }

  return [isOpen, toggle];
}
