import { h } from "preact";
import { useState } from "preact/hooks";
import Book from "../islands/Book.tsx";
import Lamp from "../islands/Lamp.tsx";
export default function Desk() {

  return (
    <div className="book-center" >
      <Book />
      <Lamp />
    </div>
  );
}
