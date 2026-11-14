export const datasetMeta = {
  sourceFile: 'nasa_fire_safety_master (1).csv',
  rows: 2855, uniqueExactRows: 562, duplicateRows: 2293, duplicatePct: 80.3,
  investigations: 13, categories: 6, fuelClasses: 8, missingCells: 0,
  risk: { mean: 5.65, median: 7.69, max: 291.83, min: 0.4 },
  quality: { o2Above100: 2, pressureAbove100: 170, riskAbove20: 2, zeroFlow: 2589 }
};

export const investigations = [
  {code:'PSI-10',name:'Flame Design',category:'Prevention & Flammability',rows:927,meanRisk:4.63,medianRisk:2.2,maxRisk:13.17,meanO2:28.12,minO2:2,maxO2:85,meanPressure:9.91,meanFlow:0.77,fuel:'Gaseous Fuel'},
  {code:'PSI-159',name:'CFI-G',category:'Prevention & Flammability (High O2)',rows:1194,meanRisk:7.74,medianRisk:7.69,maxRisk:8.41,meanO2:85,minO2:85,maxO2:85,meanPressure:14.7,meanFlow:0.63,fuel:'Gaseous Fuel (Up to 85% O2)'},
  {code:'PSI-20',name:'ACME BRE',category:'Prevention & Flammability',rows:18,meanRisk:28.5,medianRisk:2.54,maxRisk:291.83,meanO2:327.81,minO2:21,maxO2:3400,meanPressure:14.7,meanFlow:0,fuel:'Gaseous Fuel (Solid Emulator)'},
  {code:'PSI-21',name:'CLD Flame',category:'Prevention & Flammability',rows:32,meanRisk:3.74,medianRisk:2.97,maxRisk:8.97,meanO2:38.91,minO2:0,maxO2:100,meanPressure:14.7,meanFlow:0,fuel:'Gaseous Fuel'},
  {code:'PSI-22',name:'ACME E-FIELD',category:'Prevention & Flammability (Partial-g Simulation)',rows:32,meanRisk:6.16,medianRisk:6.4,maxRisk:8.97,meanO2:67.19,minO2:25,maxO2:100,meanPressure:14.7,meanFlow:0,fuel:'Gaseous Fuel'},
  {code:'PSI-23',name:'ACME s-Flame',category:'Prevention & Flammability',rows:18,meanRisk:2.04,medianRisk:2.08,maxRisk:2.08,meanO2:21,minO2:21,maxO2:21,meanPressure:25,meanFlow:0,fuel:'Gaseous Fuel'},
  {code:'PSI-26',name:'BASS',category:'Prevention & Flammability',rows:244,meanRisk:2.2,medianRisk:2.2,maxRisk:2.2,meanO2:21,minO2:21,maxO2:21,meanPressure:14.7,meanFlow:0,fuel:'Solid Fabrics & Plastics'},
  {code:'PSI-39',name:'CFI',category:'Prevention & Flammability',rows:87,meanRisk:6.46,medianRisk:7.34,maxRisk:7.68,meanO2:19.9,minO2:17,maxO2:21,meanPressure:1.53,meanFlow:0,fuel:'Liquid Droplets'},
  {code:'PSI-47',name:'DAFT',category:'Detection & Dust Diagnostics',rows:2,meanRisk:2.2,medianRisk:2.2,maxRisk:2.2,meanO2:21,minO2:21,maxO2:21,meanPressure:14.7,meanFlow:0,fuel:'Dust Particles'},
  {code:'PSI-68',name:'FLEX-2',category:'Suppression & Extinguishment',rows:8,meanRisk:7.35,medianRisk:7.35,maxRisk:7.35,meanO2:17,minO2:17,maxO2:17,meanPressure:0.5,meanFlow:0.1,fuel:'Liquid Droplets'},
  {code:'PSI-69',name:'FLEX',category:'Suppression & Extinguishment',rows:274,meanRisk:1.8,medianRisk:1.78,maxRisk:7.59,meanO2:20.07,minO2:12,maxO2:34,meanPressure:103.95,meanFlow:0,fuel:'Liquid Droplets'},
  {code:'PSI-98',name:'SAFFIRE-1',category:'Prevention & Large-Scale Fire',rows:4,meanRisk:3.02,medianRisk:3.02,maxRisk:3.84,meanO2:21.25,minO2:21,maxO2:21.5,meanPressure:14.7,meanFlow:10,fuel:'Solid Material (SAMS / Cotton Blend)'},
  {code:'PSI-99',name:'SAFFIRE-2',category:'Prevention & Large-Scale Fire',rows:15,meanRisk:3.21,medianRisk:3.89,maxRisk:3.89,meanO2:21.61,minO2:21,maxO2:22.1,meanPressure:14.7,meanFlow:12,fuel:'Solid Material (Multiple Samples)'}
];

export const categories = [
  {name:'Detection & Dust Diagnostics',rows:2,meanRisk:2.2,medianRisk:2.2},
  {name:'Prevention & Flammability',rows:1326,meanRisk:4.57,medianRisk:2.2},
  {name:'Prevention & Flammability (High O2)',rows:1194,meanRisk:7.74,medianRisk:7.69},
  {name:'Prevention & Flammability (Partial-g Simulation)',rows:32,meanRisk:6.16,medianRisk:6.4},
  {name:'Prevention & Large-Scale Fire',rows:19,meanRisk:3.17,medianRisk:3.84},
  {name:'Suppression & Extinguishment',rows:282,meanRisk:1.96,medianRisk:1.79}
];
export const fuels = [
  {name:'Dust Particles',rows:2,medianRisk:2.2},
  {name:'Gaseous Fuel',rows:1009,medianRisk:2.2},
  {name:'Gaseous Fuel (Solid Emulator)',rows:18,medianRisk:2.54},
  {name:'Gaseous Fuel (Up to 85% O2)',rows:1194,medianRisk:7.69},
  {name:'Liquid Droplets',rows:369,medianRisk:1.85},
  {name:'Solid Fabrics & Plastics',rows:244,medianRisk:2.2},
  {name:'Solid Material (Multiple Samples)',rows:15,medianRisk:3.89},
  {name:'Solid Material (SAMS / Cotton Blend)',rows:4,medianRisk:3.02}
];
export const riskBands = [
  {band:'≤2',rows:219},{band:'2–4',rows:1003},{band:'4–6',rows:18},
  {band:'6–8',rows:1334},{band:'8–10',rows:227},{band:'10–20',rows:52},{band:'>20',rows:2}
];
export const oxygenBands = [
  {band:'<20%',rows:203},{band:'20–21%',rows:1063},{band:'21–30%',rows:123},
  {band:'30–50%',rows:183},{band:'50–85%',rows:1269},{band:'85–100%',rows:12},{band:'>100%',rows:2}
];
export const anomalies = [
  {investigation:'PSI-20 · ACME BRE',fuel:'50% C2H4',oxygen:3400,pressure:14.7,risk:291.83,issue:'Oxygen value exceeds percentage scale; verify source encoding.'},
  {investigation:'PSI-20 · ACME BRE',fuel:'100%C2H4',oxygen:2100,pressure:14.7,risk:180.4,issue:'Oxygen value exceeds percentage scale; verify source encoding.'},
  {investigation:'PSI-69 · FLEX',fuel:'Multiple liquid-droplet rows',oxygen:21,pressure:336.5,risk:1.82,issue:'Pressure value is above 100 psi; verify units and source context.'}
];
export const missionAtmospheres = [
  {label:'Earth sea level',pressure:'14.7 psi',oxygen:'20.9%',note:'Reference atmosphere in the challenge brief'},
  {label:'Planned Moon base / rover',pressure:'≤10.2 psi',oxygen:'≥30%',note:'Planning scenario; not a measured row in the master CSV'},
  {label:'Spacesuit',pressure:'4.3 psi',oxygen:'100%',note:'Planning scenario; not a measured row in the master CSV'},
  {label:'ACME CFI-G test',pressure:'Not specified',oxygen:'Up to 85%',note:'Highest oxygen microgravity test noted in the supplied brief'}
];