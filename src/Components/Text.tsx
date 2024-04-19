import { useEffect } from "react";

export default function Text({ text }: { text: string }) {
  useEffect(() => {
    const glitch = document.querySelector(".glitch");
    if (glitch == null) return;

    setInterval(() => {
      glitch.classList.toggle("glitch--v1");
      setTimeout(() => {
        glitch.classList.toggle("glitch--v2");
      }, 1000);
    }, 5000);
  }, []);

  return (
    <>
      <h2
        data-text={text.split("").reverse().join("")}
        className="glitch glitch--v1"
        style={{ paddingRight: "10px" }}
      >
        {text}
      </h2>
    </>
  );
}
