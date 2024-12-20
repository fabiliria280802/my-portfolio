import { h } from "preact";
import { useState } from "preact/hooks";

export default function Book() {
  const [isStraight, setIsStraight] = useState(false);
  const handleBookClick = () => {
    setIsStraight(!isStraight);
  };

  return (
    <div className="book-center" onClick={handleBookClick}>
      <div className={`book-page ${isStraight ? "straight open" : ""}`}>
        <h1>Once Upon a time</h1>
        <p>
          ggggggggggggggggggggggggggggggggggggggggg<br />
          ggggggggggggggggggggggggggggggggggggggggg<br />
          ggggggggggggggggggggggggggggggggggggggggg<br />
        </p>
      </div>
    </div>
  );
}

