
import { useReducer } from 'react';
import dialogue from './dialogue.json';
import SuspicionMeter from './SuspicionMeter';
import EvidenceLocker from './EvidenceLocker';

const initialState = {
  suspicion: 0,
  evidence: [],
  node: 'hq_intro',
  inventory: [],
  gameOver: false,
  finalUnlocked: false
};

function reducer(state, action) {
  switch(action.type){
    case 'CHOICE':
      const s = state.suspicion + action.payload.suspicionChange;
      const newEvidence = action.payload.evidence ? [...state.evidence, action.payload.evidence] : state.evidence;
      const finalUnlocked = newEvidence.length >= 3;
      return {
        ...state,
        suspicion: s,
        evidence: newEvidence,
        node: action.payload.nextNode,
        gameOver: s >= 100,
        finalUnlocked
      };
    case 'ADD_ITEM':
      return {...state, inventory: [...state.inventory, action.payload]};
    default: return state;
  }
}

export default function App(){
  const [state, dispatch] = useReducer(reducer, initialState);
  const current = dialogue[state.node];

  if(state.gameOver) return <h1>Cover Blown! Game Over.</h1>;

  return (
    <div className="app">
      <h1>The Mole – Vite Spy Game</h1>
      <SuspicionMeter value={state.suspicion} />
      <p>{current.text}</p>
      <div className="choices">
        {current.choices.map((c,i)=>
          <button key={i} onClick={()=>dispatch({type:'CHOICE', payload:c})}>{c.text}</button>
        )}
      </div>
      <EvidenceLocker evidence={state.evidence} />
      <div className="inventory">
        <h3>Gadgets / Inventory</h3>
        {state.inventory.length===0 ? <p>No gadgets yet</p> :
          <ul>{state.inventory.map((i, idx)=><li key={idx}>{i}</li>)}</ul>}
      </div>
      {state.finalUnlocked && <p className="unlock">Final Mission Unlocked!</p>}
      <p className="hint">[Mini-games & skills placeholders ready]</p>
    </div>
  );
}
