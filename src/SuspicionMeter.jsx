
export default function SuspicionMeter({ value }) {
  const color = value<50?'green':value<80?'orange':'red';
  return (
    <div className="meter">
      <div className="fill" style={{ width: value+'%', backgroundColor: color }}></div>
      <span>{value}% Suspicion</span>
    </div>
  );
}
