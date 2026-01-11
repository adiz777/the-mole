
export default function EvidenceLocker({ evidence }) {
  return (
    <div className="locker">
      <h3>Evidence Locker</h3>
      {evidence.length===0 ? <p>No intel collected yet</p> :
        <ul>{evidence.map((e,i)=><li key={i}>{e}</li>)}</ul>}
    </div>
  );
}
