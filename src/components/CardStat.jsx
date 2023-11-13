export default function CardStat({ color, count, icon, desc }) {
  return (
    <div
      className={`${color} rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px] flex flex-col justify-center items-center gap-3`}
    >
      <div className="flex gap-2 justify-between w-full">
        <div className="text-3xl">{icon}</div>
        <div className="text-4xl">{count}</div>
      </div>
      <div className="w-full text-md font-semibold">{desc}</div>
    </div>
  );
}
