import React from 'react';
/** Procedural artwork: inline SVG and CSS only; no remote image dependencies. */
export function ArtPlaceholder({ title, style = 1, compact = false }: {title:string; style?:number; compact?:boolean}) {
  const id = `art-${style}-${title.toLowerCase().replace(/[^a-z0-9]+/g,'')}`;
  const variant = style % 4;
  return <div className={`art-artboard art-v${variant} ${compact?'art-compact':''}`} aria-label={`Abstract artwork for ${title}`}>
    <div className="art-grain"/><div className="art-grid"/>
    <svg className="art-object" viewBox="0 0 420 420" role="img" aria-hidden="true">
      <defs><linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#eaedfc"/><stop offset=".19" stopColor="#4d547c"/><stop offset=".38" stopColor="#dfe4f8"/><stop offset=".56" stopColor="#191c37"/><stop offset=".77" stopColor="#c4cbec"/><stop offset="1" stopColor="#202545"/></linearGradient><radialGradient id={`${id}-glow`}><stop stopColor="#f3f5ff" stopOpacity=".33"/><stop offset="1" stopColor="#f3f5ff" stopOpacity="0"/></radialGradient></defs>
      {variant===0 ? <><circle cx="210" cy="205" r="128" fill={`url(#${id}-metal)`} opacity=".89"/><circle cx="210" cy="205" r="87" fill="#0c0e1b"/><circle cx="210" cy="205" r="64" fill={`url(#${id}-metal)`}/><path d="M118 152c44-79 138-95 190-29M98 242c50 86 152 105 221 41" fill="none" stroke="#f3f5ff" strokeOpacity=".62" strokeWidth="2"/></> : variant===1 ? <><path d="M71 265 175 79l186 108-104 186z" fill={`url(#${id}-metal)`}/><path d="m175 79 82 193 104-85z" fill="#0c0e1b" opacity=".78"/><path d="m71 265 186 7 104-85" fill="none" stroke="#eaedfc" strokeOpacity=".55" strokeWidth="2"/></> : variant===2 ? <><ellipse cx="215" cy="211" rx="145" ry="86" transform="rotate(-28 215 211)" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="27"/><ellipse cx="215" cy="211" rx="91" ry="54" transform="rotate(-28 215 211)" fill="#0c0e1b"/><path d="M95 305 301 101" stroke="#e8ecfb" strokeOpacity=".32" strokeWidth="2"/></> : <><path d="M110 106h200v208H110z" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="20"/><path d="M150 146h120v128H150z" fill="#090a14"/><path d="m108 107 205 204m0-204L108 311" stroke="#f3f5ff" strokeOpacity=".48" strokeWidth="2"/></>}
      <circle cx="300" cy="110" r="125" fill={`url(#${id}-glow)`}/>
    </svg>
    <span className="art-index">0{((style-1)%11)+1} / KARIM STUDIO</span><span className="art-caption">{title}</span><span className="art-mark">✳</span>
  </div>
}
export default ArtPlaceholder;
