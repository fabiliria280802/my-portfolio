import { h } from "preact";
import { useState } from "preact/hooks";

export default function Lamp() {
  const [isLight, setIsLight] = useState(false);
  const handleLampClick = () => {
    setIsLight(!isLight);
  };

  return (
    <div className="lamp-container" onClick={handleLampClick}>
      <div className="lamp-main">
        <input type="checkbox" />
      </div>
    </div>
  );
}

