export default function Text({ text }: { text: string }) {
  return (
    <>
      <h2
        data-text={text.split("").reverse().join("")}
        className="area"
        style={{ paddingRight: "10px" }}
      >
        {text}
      </h2>
    </>
  );
}
