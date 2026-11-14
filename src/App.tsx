import { useMemo, useState } from 'react';
import { Activity, AlertTriangle, BarChart3, BookOpen, Database, Download, Flame, Gauge, Globe2, Layers3, Menu, Microscope, Orbit, Play, Rocket, Search, ShieldCheck, Sparkles, Target, Wind, X, ExternalLink } from 'lucide-react';
import { datasetMeta, investigations, categories, fuels, riskBands, oxygenBands, anomalies, missionAtmospheres } from './data';

type View = 'overview'|'investigations'|'risk'|'quality'|'si'|'media'|'missions';
const fmt = (n:number) => new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(n);
const nav = [
  {id:'overview' as View,label:'Mission overview',icon:Layers3},
  {id:'investigations' as View,label:'Investigation explorer',icon:Microscope},
  {id:'risk' as View,label:'Risk intelligence',icon:Gauge},
  {id:'quality' as View,label:'Data quality',icon:ShieldCheck},
  {id:'si' as View,label:'SI analyst',icon:Sparkles},
  {id:'media' as View,label:'NASA media & resources',icon:Play},
  {id:'missions' as View,label:'Moon & Mars safety',icon:Rocket}
];
function Stat({label,value,note,icon:Icon}:{label:string;value:string;note:string;icon:any}) {
  return <article className="stat"><div className="stat-icon"><Icon size={18}/></div><small>{label}</small><strong>{value}</strong><p>{note}</p></article>;
}
function Bars({items,labelKey,valueKey}:{items:any[];labelKey:string;valueKey:string}) {
  const max=Math.max(...items.map(x=>x[valueKey]),1);
  return <div className="bars">{items.map((x,i)=><div className="bar-row" key={i}><div><span>{x[labelKey]}</span><b>{fmt(x[valueKey])}</b></div><div className="track"><i style={{width:`${Math.max(2,x[valueKey]/max*100)}%`}}/></div></div>)}</div>;
}
export default function App() {
  const [view,setView]=useState<View>('overview');
  const [category,setCategory]=useState('All categories');
  const [fuel,setFuel]=useState('All fuels');
  const [search,setSearch]=useState('');
  const [selected,setSelected]=useState('PSI-159');
  const [mobile,setMobile]=useState(false);
  const [brief,setBrief]=useState('');
  const [busy,setBusy]=useState(false);
  const filtered=useMemo(()=>investigations.filter(x=>(category==='All categories'||x.category===category)&&(fuel==='All fuels'||x.fuel===fuel)&&(x.code+' '+x.name+' '+x.category+' '+x.fuel).toLowerCase().includes(search.toLowerCase())),[category,fuel,search]);
  const current=investigations.find(x=>x.code===selected)||investigations[0];
  const heading=nav.find(x=>x.id===view)?.label||'Mission overview';
  const exportCSV=()=>{
    const head=['Investigation code','Investigation','Category','Rows','Median supplied risk index','O2 min (%)','O2 max (%)','Mean pressure (psi)','Fuel'];
    const rows=filtered.map(x=>[x.code,x.name,x.category,x.rows,x.medianRisk,x.minO2,x.maxO2,x.meanPressure,x.fuel]);
    const csv=[head,...rows].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
    const a=document.createElement('a'); const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); a.href=url;a.download='NASA_investigation_summary.csv';a.click();URL.revokeObjectURL(url);
  };
  const makeBrief=async()=>{
    setBusy(true);setBrief('');
    await new Promise(r=>setTimeout(r,500));
    setBrief(`Observed signals\n\nThe selected dataset summary contains ${datasetMeta.rows.toLocaleString()} rows across ${datasetMeta.investigations} investigations. ${current.code} (${current.name}) has ${current.rows} source rows, a median supplied index of ${current.medianRisk}, and an oxygen range of ${current.minO2}%–${current.maxO2}%.\n\nInterpretation limits\n\nThe flammability_risk_index formula and calibration are undocumented. It must not be described as a validated NASA safety score. Two oxygen values (2,100 and 3,400) are data-quality anomalies, and 170 pressure values exceed 100 psi and require source/unit verification. Exact duplicate rows may represent repeats or export duplication.\n\nRecommended next checks\n\nVerify source units and encoding, obtain run identifiers to distinguish repeated experiments from duplicated exports, and consult the original NASA source records before drawing operational conclusions. This brief is an offline summary, not spacecraft safety guidance.`);
    setBusy(false);
  };
  return <div className="shell">
    <aside className={`sidebar ${mobile?'open':''}`}>
      <div className="brand"><div className="brand-mark"><Flame/></div><div><b>FIRELINE <em>SI</em></b><small>COSMIC ASTRONOVA · SPACE SCIENCE</small></div><button className="close mobile-only" onClick={()=>setMobile(false)}><X/></button></div>
      <div className="mission-tag"><i/> COSMIC ASTRONOVA / MISSION 2026</div>
      <div className="nav-caption">WORKSPACE</div>
      <nav>{nav.map(n=><button key={n.id} className={view===n.id?'active':''} onClick={()=>{setView(n.id);setMobile(false)}}><n.icon size={17}/>{n.label}</button>)}</nav>
      <div className="side-bottom"><span>● Dataset loaded</span><p>NASA PSI master CSV<br/>2,855 source rows</p><small>FLAME IN FREE FALL<br/>RESEARCH CONSOLE v1.0</small></div>
    </aside>
    <main>
      <header><button className="mobile-only menu" onClick={()=>setMobile(true)}><Menu/></button><div className="crumb">COSMIC ASTRONOVA <span>/</span> {heading.toUpperCase()}</div><div className="status">● OFFLINE DATASET ANALYSIS <b>FF</b></div></header>
      <div className="content">
        <section className="hero"><div><div className="eyebrow">✦ COSMIC ASTRONOVA · NASA RESEARCH</div><h1>Flame in Free Fall<span>.</span></h1><p>SI-powered fire safety intelligence for the next era of human space exploration.</p><label><Orbit size={13}/> DEEP SPACE RESEARCH CONSOLE</label><div className="hero-meta"><span><Database size={13}/> 2,855 CSV records</span><span><Target size={13}/> 13 investigations</span><span><Activity size={13}/> 6 research categories</span></div></div><div className="orbit-art"><div className="ring r1"/><div className="ring r2"/><div className="core"><Flame size={38}/></div><small>0G / MICROGRAVITY</small></div></section>
        <div className="page-title"><div><small>MISSION INTELLIGENCE</small><h2>{heading}</h2><p>Explore experimental coverage, compare investigation profiles and surface data-quality signals.</p></div><button className="secondary" onClick={exportCSV}><Download size={15}/> Export filtered summary</button></div>

        {view==='overview'&&<section className="stack">
          <div className="stats"><Stat label="Source records" value={fmt(datasetMeta.rows)} note="Rows in uploaded master CSV" icon={Database}/><Stat label="Investigations" value="13" note="Distinct PSI investigation codes" icon={Microscope}/><Stat label="Unique exact rows" value={fmt(datasetMeta.uniqueExactRows)} note={`${fmt(datasetMeta.duplicateRows)} exact duplicate rows`} icon={Layers3}/><Stat label="Median supplied index" value={fmt(datasetMeta.risk.median)} note="Undocumented formula; not validated" icon={Gauge}/></div>
          <div className="two"><article className="panel"><h3>Investigation coverage</h3><p className="muted">Source rows by investigation</p><Bars items={investigations} labelKey="code" valueKey="rows"/></article><article className="panel"><h3>Research categories</h3><p className="muted">Rows grouped by category</p><Bars items={categories} labelKey="name" valueKey="rows"/></article></div>
          <article className="panel"><h3>Dataset at a glance</h3><div className="mini-grid"><div><b>80.3%</b><span>Exact duplicate rows</span></div><div><b>0</b><span>Missing cells reported</span></div><div><b>8</b><span>Fuel classes</span></div><div><b>6</b><span>Research categories</span></div></div></article>
        </section>}

        {view==='investigations'&&<section className="stack">
          <article className="panel filters"><div><h3>Investigation explorer</h3><p className="muted">Filter the experiment catalogue and select a profile.</p></div><div className="filter-controls"><label>Category<select value={category} onChange={e=>setCategory(e.target.value)}><option>All categories</option>{categories.map(x=><option key={x.name}>{x.name}</option>)}</select></label><label>Fuel class<select value={fuel} onChange={e=>setFuel(e.target.value)}><option>All fuels</option>{fuels.map(x=><option key={x.name}>{x.name}</option>)}</select></label><label className="search">Search<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Code, name or fuel…"/></label></div></article>
          <div className="explorer"><article className="panel"><div className="list-head">INVESTIGATIONS ({filtered.length})</div>{filtered.map(x=><button key={x.code} className={`investigation ${selected===x.code?'chosen':''}`} onClick={()=>setSelected(x.code)}><span><b>{x.code}</b><small>{x.name}</small></span><strong>{fmt(x.medianRisk)}</strong></button>)}{!filtered.length&&<p className="muted">No matching investigations.</p>}</article>
          <article className="panel detail"><div className="eyebrow">SELECTED INVESTIGATION</div><h3>{current.code} · {current.name}</h3><p className="muted">{current.category}</p><div className="stats compact"><Stat label="Source rows" value={fmt(current.rows)} note="Rows in dataset" icon={Database}/><Stat label="Median index" value={fmt(current.medianRisk)} note="Supplied index" icon={Gauge}/></div><div className="facts"><div><span>Fuel</span><b>{current.fuel}</b></div><div><span>Oxygen range</span><b>{current.minO2}% – {current.maxO2}%</b></div><div><span>Mean oxygen</span><b>{fmt(current.meanO2)}%</b></div><div><span>Mean pressure</span><b>{fmt(current.meanPressure)} psi</b></div><div><span>Mean flow</span><b>{fmt(current.meanFlow)}</b></div><div><span>Maximum index</span><b>{fmt(current.maxRisk)}</b></div></div><p className="caution">The supplied flammability risk index has no documented formula or calibration in the provided dataset.</p></article></div>
        </section>}

        {view==='risk'&&<section className="stack"><div className="stats"><Stat label="Mean supplied index" value={fmt(datasetMeta.risk.mean)} note="Across source summary" icon={Gauge}/><Stat label="Median supplied index" value={fmt(datasetMeta.risk.median)} note="Not a validated risk score" icon={Target}/><Stat label="Maximum supplied index" value={fmt(datasetMeta.risk.max)} note="Includes flagged anomaly values" icon={AlertTriangle}/><Stat label="Oxygen anomalies" value="2" note="Values exceed 100%" icon={Wind}/></div><div className="two"><article className="panel"><h3>Supplied index distribution</h3><p className="muted">Row counts in supplied bands</p><Bars items={riskBands} labelKey="band" valueKey="rows"/></article><article className="panel"><h3>Oxygen concentration bands</h3><p className="muted">Values as represented in source</p><Bars items={oxygenBands} labelKey="band" valueKey="rows"/></article></div><article className="panel caution"><AlertTriangle/> Index labels and thresholds are descriptive only. Do not interpret these bands as certified spacecraft fire-safety risk levels.</article></section>}

        {view==='quality'&&<section className="stack"><div className="stats"><Stat label="Exact duplicate rows" value="2,293" note="80.3% of source rows" icon={Layers3}/><Stat label="Oxygen >100%" value="2" note="PSI-20 values 2,100 and 3,400" icon={AlertTriangle}/><Stat label="Pressure >100 psi" value="170" note="Verify units and source context" icon={Gauge}/><Stat label="Zero flow values" value="2,589" note="Meaning is not documented" icon={Activity}/></div><article className="panel"><h3>Priority data-quality flags</h3><div className="table-wrap"><table><thead><tr><th>Investigation</th><th>Fuel</th><th>O₂ value</th><th>Pressure</th><th>Supplied index</th><th>Issue</th></tr></thead><tbody>{anomalies.map((a,i)=><tr key={i}><td>{a.investigation}</td><td>{a.fuel}</td><td>{fmt(a.oxygen)}%</td><td>{fmt(a.pressure)} psi</td><td>{fmt(a.risk)}</td><td>{a.issue}</td></tr>)}</tbody></table></div></article><article className="panel"><h3>Audit notes</h3><ul className="notes"><li>2,855 source rows include 562 unique exact rows and 2,293 exact duplicates.</li><li>The supplied risk-index formula and score thresholds are undocumented.</li><li>Two PSI-20 oxygen values (2,100 and 3,400) are treated as data-quality anomalies.</li><li>170 pressure values exceed 100 psi and require source/unit verification.</li><li>2,589 flow values are zero; the dataset does not establish whether zero means no flow or unavailable measurement.</li></ul></article></section>}

        {view==='si'&&<section className="stack"><article className="panel si-panel"><div className="eyebrow">✦ SUPER INTELLIGENCE RESEARCH ASSISTANT</div><h3>Evidence-grounded research brief</h3><p className="muted">Generate an offline interpretation of the selected investigation. This local ZIP version uses a transparent template; the hosted version can connect to the AppDeploy AI endpoint.</p><div className="facts"><div><span>Selected profile</span><b>{current.code} · {current.name}</b></div><div><span>Source rows</span><b>{current.rows}</b></div><div><span>Supplied median index</span><b>{current.medianRisk}</b></div></div><button className="primary" disabled={busy} onClick={makeBrief}><Sparkles size={16}/>{busy?'Preparing brief…':'Generate SI research brief'}</button>{brief&&<pre className="brief">{brief}</pre>}</article></section>}

        {view==='media'&&<section className="stack"><article className="panel media-intro"><div className="eyebrow">NASA · PHYSICAL SCIENCES INFORMATICS</div><h3>NASA media & research resources</h3><p>Explore official research collections and media about flames, combustion and fire safety in microgravity. External resources open in a new tab.</p></article><div className="media-grid">
          <article className="media-card"><img src="https://images-assets.nasa.gov/image/iss063e041755/iss063e041755~large.jpg" alt="International Space Station" onError={e=>{(e.currentTarget as HTMLImageElement).style.display='none'}}/><div><small>NASA IMAGE LIBRARY</small><h3>Space station research environment</h3><p>Browse NASA imagery related to human spaceflight and research aboard the ISS.</p><a href="https://images.nasa.gov/" target="_blank" rel="noreferrer">Explore NASA Images <ExternalLink size={13}/></a></div></article>
          <article className="media-card"><img src="https://images-assets.nasa.gov/image/iss056e041364/iss056e041364~large.jpg" alt="Earth from orbit" onError={e=>{(e.currentTarget as HTMLImageElement).style.display='none'}}/><div><small>NASA PSI DATA</small><h3>Physical Sciences Informatics</h3><p>Search experiment data and publications from NASA's physical sciences research.</p><a href="https://psi.nasa.gov/" target="_blank" rel="noreferrer">Open NASA PSI <ExternalLink size={13}/></a></div></article></div>
          <article className="panel"><h3>Featured research video</h3><div className="video"><iframe src="https://www.youtube-nocookie.com/embed?listType=search&list=NASA%20SAFFIRE%20space%20fire%20experiment" title="NASA SAFFIRE fire experiment videos" allowFullScreen loading="lazy"/></div><p className="muted">Search-based YouTube embed; availability and exact video selection are controlled by YouTube.</p></article>
          <article className="panel"><h3>Official research links</h3><div className="resource-links"><a href="https://psi.nasa.gov/physci/repo/" target="_blank" rel="noreferrer"><Globe2/> NASA PSI Repository</a><a href="https://science.nasa.gov/learn/entry-points-to-nasa-data/" target="_blank" rel="noreferrer"><BookOpen/> NASA Data Entry Points</a><a href="https://images.nasa.gov/" target="_blank" rel="noreferrer"><Play/> NASA Image and Video Library</a></div></article></section>}

        {view==='missions'&&<section className="stack"><article className="panel mission-hero"><div><div className="eyebrow">NEXT FRONTIER · HUMAN SPACE EXPLORATION</div><h3>Fire safety beyond Earth</h3><p>Moon and Mars habitats introduce different pressure, oxygen and operational contexts. The dashboard compares planning scenarios with the supplied research summary; it does not certify a habitat design.</p><div className="planet-tags"><span>EARTH</span><span>MOON</span><span>MARS</span></div></div><div className="planet-art"><div className="earth"/><div className="moon"/><div className="mars"/></div></article><div className="two">{missionAtmospheres.map((m,i)=><article className="panel atmosphere" key={i}><small>ATMOSPHERE PROFILE {i+1}</small><h3>{m.label}</h3><div className="facts"><div><span>Pressure</span><b>{m.pressure}</b></div><div><span>Oxygen</span><b>{m.oxygen}</b></div></div><p className="muted">{m.note}</p></article>)}</div><article className="panel"><h3>Three fire-safety pillars</h3><div className="pillars"><div><ShieldCheck/><b>Prevention</b><p>Understand materials, ignition conditions, oxygen concentration and habitat environment.</p></div><div><Search/><b>Detection</b><p>Detect smoke, particles and early combustion signals in enclosed environments.</p></div><div><Wind/><b>Suppression</b><p>Study extinguishment behavior and verify system performance under mission-specific conditions.</p></div></div></article></section>}
        <footer>FIRELINE SI · COSMIC ASTRONOVA <span>Research exploration interface · Not operational safety guidance</span></footer>
      </div>
    </main>
  </div>;
}