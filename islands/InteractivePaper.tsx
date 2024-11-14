import { h } from "preact";
import { useEffect } from "preact/hooks";

export default function PaperAnimation() {
  useEffect(() => {
    const ball = document.querySelector('.paper-ball');
    ball?.addEventListener('animationend', () => {
    });
  }, []);

  return (
    <div class="container">
      <div class="paper-ball"></div>
    </div>
  );
}
