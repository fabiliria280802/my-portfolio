import { h } from "preact";
import { useState } from "preact/hooks";
import Navigation from "../components/Navigation.tsx";

export default function PaperAnimation() {
  const [unfolded, setUnfolded] = useState(false);

  const handleClick = () => {
    setUnfolded(true);
  };

  return (
    <div class="paper-container" onClick={handleClick}>
      {!unfolded ? (
        <div class="crumpled-paper"></div>
      ) : (
        <div class="newspaper">
          <Navigation />
        </div>
      )}
    </div>
  );
}