import { useState, useEffect, useRef } from 'react';

const goldColor = '#c9a227';
const fontSizes = { 
  normal: '1.15rem', 
  large: '1.35rem', 
  xl: '1.55rem', 
  xxl: '1.75rem' 
};
const speeds = { slow: 70, medium: 45, fast: 30, faster: 20 };

function RestMarker() {
  return (
    <div className="py-20 flex justify-center print:py-8">
      <div className="flex items-center gap-4 opacity-30">
        <div className="w-10 h-px" style={{ background: goldColor }}></div>
        <div className="w-2 h-2 rotate-45" style={{ background: goldColor }}></div>
        <div className="w-10 h-px" style={{ background: goldColor }}></div>
      </div>
    </div>
  );
}

function PhotoPlaceholder({ caption }) {
  return (
    <figure className="my-12 print:my-6 print:break-inside-avoid">
      <div 
        className="w-full max-w-md mx-auto rounded-sm flex items-center justify-center h-64 print:h-48 print:border-gray-300"
        style={{ background: 'rgba(201,162,39,0.05)', border: '1px solid rgba(201,162,39,0.2)' }}
      >
        <div className="text-center opacity-40">
          <p className="text-3xl mb-2">◻</p>
          <p className="text-xs uppercase tracking-widest">Foto</p>
        </div>
      </div>
      {caption && <figcaption className="text-center text-sm opacity-50 mt-3 italic">{caption}</figcaption>}
    </figure>
  );
}

function Memory({ children }) {
  return (
    <div className="py-8 border-l-2 pl-6 my-8 print:py-4 print:my-4 print:break-inside-avoid" style={{ borderColor: goldColor }}>
      {children}
    </div>
  );
}

export default function VoorVakeV4() {
  const [fontSize, setFontSize] = useState('large');
  const [scrollSpeed, setScrollSpeed] = useState('medium');
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    if (isScrolling && containerRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop += 1;
          if (containerRef.current.scrollTop >= containerRef.current.scrollHeight - containerRef.current.clientHeight - 10) {
            setIsScrolling(false);
          }
        }
      }, speeds[scrollSpeed]);
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    }
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isScrolling, scrollSpeed]);

  const baseStyle = {
    fontFamily: 'Georgia, serif',
    fontSize: fontSizes[fontSize],
    background: 'linear-gradient(180deg, #1a1612 0%, #0f0d0b 50%, #1a1612 100%)',
    color: '#e8e0d4',
    lineHeight: 1.8
  };

  return (
    <>
      <style>{`
        @media print {
          body { 
            background: white !important; 
            color: black !important;
            font-size: 11pt !important;
            line-height: 1.5 !important;
          }
          .print\\:hidden { display: none !important; }
          .print\\:py-8 { padding-top: 2rem; padding-bottom: 2rem; }
          .print\\:py-4 { padding-top: 1rem; padding-bottom: 1rem; }
          .print\\:my-6 { margin-top: 1.5rem; margin-bottom: 1.5rem; }
          .print\\:my-4 { margin-top: 1rem; margin-bottom: 1rem; }
          .print\\:h-48 { height: 12rem; }
          .print\\:break-inside-avoid { break-inside: avoid; }
          .print\\:break-before-page { break-before: page; }
          section { break-inside: avoid; }
        }
      `}</style>

      <div ref={containerRef} className="h-screen overflow-y-auto relative print:h-auto print:overflow-visible" style={baseStyle}>

        {/* Controls - hidden on print */}
        <div className="fixed bottom-4 right-4 flex flex-col gap-2 items-end z-50 print:hidden">
          <div className="bg-black/80 rounded-lg p-2 flex items-center gap-1">
            <button 
              onClick={() => setIsScrolling(!isScrolling)} 
              className="px-2 py-1 text-amber-200/60 hover:text-amber-100 text-sm"
            >
              {isScrolling ? '⏸' : '▶'}
            </button>
            <span className="text-amber-900/50">|</span>
            <button 
              onClick={() => setScrollSpeed('slow')} 
              className={scrollSpeed === 'slow' ? 'px-2 py-1 text-xs text-amber-200' : 'px-2 py-1 text-xs text-amber-200/40 hover:text-amber-100'}
            >
              1×
            </button>
            <button 
              onClick={() => setScrollSpeed('medium')} 
              className={scrollSpeed === 'medium' ? 'px-2 py-1 text-xs text-amber-200' : 'px-2 py-1 text-xs text-amber-200/40 hover:text-amber-100'}
            >
              2×
            </button>
            <button 
              onClick={() => setScrollSpeed('fast')} 
              className={scrollSpeed === 'fast' ? 'px-2 py-1 text-xs text-amber-200' : 'px-2 py-1 text-xs text-amber-200/40 hover:text-amber-100'}
            >
              3×
            </button>
            <button 
              onClick={() => setScrollSpeed('faster')} 
              className={scrollSpeed === 'faster' ? 'px-2 py-1 text-xs text-amber-200' : 'px-2 py-1 text-xs text-amber-200/40 hover:text-amber-100'}
            >
              4×
            </button>
          </div>
          <div className="flex gap-1 bg-black/80 rounded-lg p-1">
            <button 
              onClick={() => setFontSize('normal')} 
              className={fontSize === 'normal' ? 'w-7 h-7 flex items-center justify-center text-amber-100' : 'w-7 h-7 flex items-center justify-center text-amber-200/40 hover:text-amber-100'}
              style={{ fontSize: '0.75rem' }}
            >
              A
            </button>
            <button 
              onClick={() => setFontSize('large')} 
              className={fontSize === 'large' ? 'w-7 h-7 flex items-center justify-center text-amber-100' : 'w-7 h-7 flex items-center justify-center text-amber-200/40 hover:text-amber-100'}
              style={{ fontSize: '0.9rem' }}
            >
              A
            </button>
            <button 
              onClick={() => setFontSize('xl')} 
              className={fontSize === 'xl' ? 'w-7 h-7 flex items-center justify-center text-amber-100' : 'w-7 h-7 flex items-center justify-center text-amber-200/40 hover:text-amber-100'}
              style={{ fontSize: '1.05rem' }}
            >
              A
            </button>
            <button 
              onClick={() => setFontSize('xxl')} 
              className={fontSize === 'xxl' ? 'w-7 h-7 flex items-center justify-center text-amber-100' : 'w-7 h-7 flex items-center justify-center text-amber-200/40 hover:text-amber-100'}
              style={{ fontSize: '1.2rem' }}
            >
              A
            </button>
          </div>
        </div>

        {/* ==================== TITLE ==================== */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 relative print:min-h-0 print:py-16">
          <p className="text-5xl md:text-7xl font-normal tracking-wide mb-4" style={{ color: goldColor, fontVariant: 'small-caps' }}>
            Voor Vake
          </p>
          <p className="text-lg opacity-50 italic">Van Vincent</p>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center print:hidden">
            <div className="w-px h-12 opacity-20" style={{ background: goldColor }}></div>
            <p className="text-xs opacity-30 mt-3">scroll naar beneden</p>
          </div>
        </section>

        {/* ==================== EPIGRAPH ==================== */}
        <section className="py-24 px-6 print:py-12">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-xl md:text-2xl italic opacity-70 leading-relaxed">
              "Voor hen die na ons komen."
            </p>
            <p className="mt-6 opacity-40 text-sm">
              — Dit heb je nooit gezegd. Maar je leefde het. En ik lette op.
            </p>
          </div>
        </section>

        {/* ==================== OPENING ==================== */}
        <section className="min-h-screen flex items-center px-6 py-20 print:min-h-0 print:py-12">
          <div className="max-w-xl mx-auto">
            <div className="space-y-6 opacity-90">
              <p className="text-lg">Dit is geen bedankje.</p>
              <p>
                Bedankjes zijn voor cadeaus—dingen die je overhandigt, ontvangt, en dan is het klaar. 
                Wat jij deed was anders. Je gaf me geen cadeau. Je bouwde iets. Jarenlang. Stilletjes. Volhardend.
              </p>
              <p>Dit is een spiegel. Ik wil je laten zien wat je gemaakt hebt.</p>
              <p>
                Je leerde me niet. Je bouwde architectuur. Je vormde hoe ik denk.
              </p>
            </div>
            
            <PhotoPlaceholder caption="Vader en zoon, de vroege jaren" />

            <div className="space-y-6 opacity-90">
              <p>
                Ik begreep toen niet wat je aan het doen was. Ik dacht gewoon dat vaders zo waren. 
                Ik wist niet dat je systemen in me installeerde—denkpatronen die nog decennia zouden draaien 
                nadat ik je huis had verlaten.
              </p>
              <p className="text-lg" style={{ color: goldColor }}>
                Nu zie ik het. Ik zie jou. En ik wil dat je weet: het werkte.
              </p>
            </div>
          </div>
        </section>

        <RestMarker />

        {/* ==================== MANTRAS INTRO ==================== */}
        <section className="py-24 px-6 print:py-12">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-3xl md:text-4xl mb-6" style={{ color: goldColor, fontVariant: 'small-caps', letterSpacing: '0.1em' }}>
              Wat Je Zei
            </p>
            <p className="opacity-60">
              Je had zinnen. Dingen die je zo vaak herhaalde dat ze deel werden van de lucht in ons huis. 
              Ik besefte niet dat je me aan het programmeren was. 
              Elke zin was gecomprimeerde filosofie—een systeem verpakt in een zin.
            </p>
          </div>
        </section>

        {/* ==================== MANTRA 1: VOORBEREIDING ==================== */}
        <section className="min-h-screen flex items-center px-6 py-20 print:min-h-0 print:py-12 print:break-before-page">
          <div className="max-w-xl mx-auto w-full">
            <p className="text-3xl md:text-4xl font-light leading-tight mb-6">
              Voorbereiding is alles
            </p>
            <div className="w-20 h-px mb-10" style={{ background: goldColor }}></div>
            
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Het Moment</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Voor elke grote beslissing verdween je naar je kantoor. Dagen achtereen. 
                    Ik zag de spreadsheets zich opstapelen op je bureau, de notities in jouw handschrift, 
                    de telefoontjes naar mensen wiens kennis je respecteerde. Ik dacht dat het obsessief was. 
                    Dat je je te veel zorgen maakte.
                  </p>
                  <p>
                    Ik begreep niet dat je de grond aan het bouwen was voordat je erop stapte. 
                    Je maakte je geen zorgen—je construeerde zekerheid.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Wat Het Bouwde</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Ik doe nu wekenlang onderzoek voor grote aankopen. 
                    Voor Defné en ik ons huis aan de Jagershoek kochten, bouwde ik spreadsheets die je nooit hebt gezien. 
                    Elk scenario. Elke buffer. Elke noodoplossing. 
                    Ik wist precies wat we konden overleven. Alles uitgewerkt.
                  </p>
                  <p>
                    Mensen denken dat ik angstig ben. Dat ben ik niet. Ik ben voorbereid. 
                    Er is een verschil. Jij leerde me het verschil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== MANTRA 2: EERST DOEN (REFRAMED) ==================== */}
        <section className="min-h-screen flex items-center px-6 py-20 print:min-h-0 print:py-12" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="max-w-xl mx-auto w-full">
            <p className="text-3xl md:text-4xl font-light leading-tight mb-6">
              Eerst doen wat je moet doen
            </p>
            <div className="w-20 h-px mb-10" style={{ background: goldColor }}></div>
            
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Het Moment</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Ik moest mijn tafels leren. Ik weet niet meer of ik het moeilijk vond of gewoon verveeld was—waarschijnlijk allebei. 
                    Je gaf me een bal. "Dribbelen," zei je. "Geef me het volgende getal bij elke stuit."
                  </p>
                  <p>
                    Het was vreemd. Nieuw. Niet hoe anderen hun tafels leerden. 
                    Maar het werkte—het ritme van de bal, de getallen die er vanzelf uitkwamen. 
                    En daarna, als het klaar was, kon ik TV kijken of lezen.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Wat Het Bouwde</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Je bedoelde me discipline te leren. Eerst werken, dan spelen.
                  </p>
                  <p>
                    Maar ik absorbeerde iets anders. Iets diepers.
                  </p>
                  <p>
                    Een bal en tafels hebben niks met elkaar te maken—totdat ze dat wel hebben. 
                    Je liet me zien dat grenzen tussen domeinen zachter zijn dan ze lijken. 
                    Dat oplossingen uit onverwachte combinaties kunnen komen. 
                    Dat de vreemde aanpak soms de beste aanpak is.
                  </p>
                  <p style={{ color: goldColor }}>
                    De discipline nam ik ook mee. Maar het kruisbestuiven van ideeën—dat werd hoe ik denk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== MANTRA 3: GEBRUIK DINGEN ==================== */}
        <section className="min-h-screen flex items-center px-6 py-20 print:min-h-0 print:py-12">
          <div className="max-w-xl mx-auto w-full">
            <p className="text-3xl md:text-4xl font-light leading-tight mb-6">
              Gebruik de dingen waarvoor ze dienen
            </p>
            <div className="w-20 h-px mb-10" style={{ background: goldColor }}></div>
            
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Het Moment</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Ik gebruikte een mes als schroevendraaier. Of een stoel als ladder. 
                    Zoiets—een of andere improvisatie die mij slim leek. 
                    Je stopte me. Niet boos, gewoon... precies. 
                    "Gebruik de dingen waarvoor ze dienen." 
                    Je liet me zien waar de echte schroevendraaier lag. 
                    Je legde uit waarom de stoel zou breken.
                  </p>
                  <p>Het leek toen een kleine correctie. Dat was het niet.</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Wat Het Bouwde</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Ik heb nu wat mensen een "Buy It For Life" filosofie noemen. 
                    Ik onderzoek gereedschap. Ik begrijp het doel ervan. 
                    Ik koop één keer het juiste in plaats van drie keer het verkeerde.
                  </p>
                  <p>
                    Meer dan dat: ik respecteer ontwerpintentie. Alles is ergens voor gemaakt. 
                    Als je begrijpt waarvoor, werk je met de stroom mee in plaats van ertegen. 
                    Dat is een filosofie die veel verder reikt dan schroevendraaiers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PhotoPlaceholder caption="Onderweg ergens naartoe samen" />

        {/* ==================== MANTRA 4: INZICHT VISIE LANGE TERMIJN ==================== */}
        <section className="min-h-screen flex items-center px-6 py-20 print:min-h-0 print:py-12 print:break-before-page" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="max-w-xl mx-auto w-full">
            <p className="text-3xl md:text-4xl font-light leading-tight mb-6">
              Inzicht, visie en lange termijn
            </p>
            <div className="w-20 h-px mb-10" style={{ background: goldColor }}></div>
            
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Het Moment</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Dit was geen enkel moment. Dit was een raamwerk waar je steeds naar terugkeerde. 
                    Als ik beslissingen nam—over school, over geld, over het leven—liep je het met me door. 
                    "Wat zie je?" Dat is inzicht. 
                    "Waar leidt dit naartoe?" Dat is visie. 
                    "Wat is belangrijk over tien jaar?" Dat is lange termijn.
                  </p>
                  <p>Drie woorden. Een compleet besturingssysteem voor besluitvorming.</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Wat Het Bouwde</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Ik denk nu in decennia. Ik bereken bodems, niet plafonds—wat is het ergste dat kan gebeuren, 
                    en kan ik het overleven? Ik plan al voor kinderen die nog niet bestaan.
                  </p>
                  <p>
                    Het huis aan de Jagershoek is infrastructuur voor een leven, niet alleen een plek om te slapen. 
                    Begane grond voor Defné's salon. Ruimte om te groeien. 
                    Ontworpen voor wat we nodig hebben over twintig jaar, niet alleen voor nu.
                  </p>
                  <p style={{ color: goldColor }}>
                    Je plande niet alleen voor jouw toekomst. Je plande voor de mijne. 
                    En nu plan ik voor die van hen die na mij komen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== MANTRA 5: GELEIDELIJK EN BLIJVEND ==================== */}
        <section className="min-h-screen flex items-center px-6 py-20 print:min-h-0 print:py-12">
          <div className="max-w-xl mx-auto w-full">
            <p className="text-3xl md:text-4xl font-light leading-tight mb-6">
              Liever geleidelijk aan en blijvend
            </p>
            <div className="w-20 h-px mb-10" style={{ background: goldColor }}></div>
            
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Het Moment</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Ik wilde iets snels. Een snelle oplossing. Een kortere weg. 
                    Ik weet niet meer precies wat—misschien ging het over sparen, of iets leren, of een probleem oplossen. 
                    Je schudde je hoofd. "Liever geleidelijk aan en blijvend." 
                    Beter langzaam en permanent dan snel en fragiel.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Wat Het Bouwde</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Ik vertrouw snelle oplossingen niet meer. Ik vertrouw ook niet op wilskracht—wilskracht is een eindige bron, 
                    en alles wat ervan afhangt zal uiteindelijk falen. In plaats daarvan bouw ik systemen. 
                    Ik stop de inspanning vooraf in structuur, en dan gaat het vanzelf.
                  </p>
                  <p>
                    Mijn spaargeld gebeurt automatisch. Mijn investeringen groeien zonder mijn aandacht. 
                    Mijn gewoontes zijn ontworpen om verwaarlozing te overleven.
                  </p>
                  <p>
                    Ik bouwde langzaam. En wat ik bouwde blijft.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== MANTRA 6: KWALITEIT ==================== */}
        <section className="min-h-screen flex items-center px-6 py-20 print:min-h-0 print:py-12" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="max-w-xl mx-auto w-full">
            <p className="text-3xl md:text-4xl font-light leading-tight mb-6">
              Kwaliteit komt steeds naar de oppervlakte
            </p>
            <div className="w-20 h-px mb-10" style={{ background: goldColor }}></div>
            
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Het Moment</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Ik was gefrustreerd over iets. Iemand die geen erkenning verdiende en het toch kreeg. 
                    Werk dat ik had gedaan dat over het hoofd werd gezien. 
                    Een of ander onrecht in hoe de wereld aandacht verdeelt. 
                    Je was geduldig met mijn frustratie, maar onbewogen.
                  </p>
                  <p>
                    "Kwaliteit komt steeds naar de oppervlakte." 
                    Wacht. Doe goed werk. Het vindt uiteindelijk zijn niveau. 
                    De ruis legt zich. Wat echt is wordt zichtbaar.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Wat Het Bouwde</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Ik jaag geen erkenning na. Ik heb geen directe bevestiging nodig. 
                    Ik vertrouw op vakmanschap—dat als ik iets goeds maak, het uiteindelijk gezien wordt voor wat het is. 
                    Dit maakt me geduldig op manieren die mensen verrassen. 
                    Ik kan maanden aan iets werken zonder het aan iemand te laten zien, 
                    omdat ik weet dat kwaliteit zijn eigen tijdlijn heeft.
                  </p>
                  <p>
                    Het betekent ook dat ik geen bochten afsnijd. Als niemand het ziet, doe ik het nog steeds goed. 
                    Want kwaliteit komt naar boven, en ik wil me niet schamen als dat gebeurt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== MANTRA 7: NIETS NEGATIEFS (MORE BREATHING ROOM) ==================== */}
        <section className="min-h-screen flex items-center px-6 py-20 print:min-h-0 print:py-12 print:break-before-page">
          <div className="max-w-xl mx-auto w-full">
            <p className="text-3xl md:text-4xl font-light leading-tight mb-6">
              Niets negatiefs denken over jezelf
            </p>
            <div className="w-20 h-px mb-10" style={{ background: goldColor }}></div>
            
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Het Moment</p>
                <div className="opacity-85 space-y-3">
                  <p>
                    Ik was hard voor mezelf. Een mislukking. Een fout. 
                    De zelfkritiek spiraaleerde op de manier die het doet als je jong bent 
                    en nog niet hebt geleerd dat je innerlijke stem fout kan zijn.
                  </p>
                  <p>
                    Je stopte me. "Niets negatiefs denken over jezelf." 
                    Het was geen suggestie. Het was een instructie.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Wat Het Bouwde</p>
                <div className="opacity-85 space-y-6">
                  <p>
                    De andere mantra's draaien nu automatisch in mij.
                  </p>
                  <p>
                    Deze niet.
                  </p>
                  <p>
                    Ik ben nog steeds aan het leren. De zelfkritiek komt nog steeds. 
                    Maar als dat gebeurt, hoor ik jouw stem. "Niets negatiefs." 
                    En soms is dat genoeg om de spiraal te onderbreken.
                  </p>
                  <p className="pt-4" style={{ color: goldColor }}>
                    Je probeerde me te beschermen. Van mezelf. 
                    Je kon de wreedheid niet stoppen—maar je gaf me een zin om ermee te vechten.
                  </p>
                  <p className="opacity-60 italic">
                    Ik vecht nog steeds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RestMarker />

        {/* ==================== WAT IK ZAG - MEMORIES AS EVIDENCE ==================== */}
        <section className="py-20 px-6 print:py-12 print:break-before-page" style={{ background: 'rgba(201, 162, 39, 0.05)' }}>
          <div className="max-w-xl mx-auto">
            <p className="text-2xl md:text-3xl mb-6 text-center" style={{ color: goldColor, fontVariant: 'small-caps', letterSpacing: '0.1em' }}>
              Wat Ik Zag
            </p>
            <p className="text-center mb-12 opacity-70">
              Tussen de lessen door waren er momenten. 
              Keren dat ik zag hoe goed je oplette—zelfs op dingen die je zelf niet begreep.
            </p>

            <Memory>
              <p className="text-lg mb-4">
                Je kocht een computer voor me voordat ik herinneringen kon vormen. Ik was twee, misschien drie.
              </p>
              <p className="opacity-70">
                Ik kon nog niet lezen. Maar je zag iets aankomen—je begreep dat technologische geletterdheid belangrijk zou worden. 
                Dat ik moest opgroeien met mijn handen op een toetsenbord, nog voordat ik een boek kon vasthouden.
              </p>
              <p className="text-lg mt-4" style={{ color: goldColor }}>
                Je zag mijn toekomst voordat ik zelf iets kon zien.
              </p>
            </Memory>

            <Memory>
              <p className="text-lg mb-4">
                Je kocht een Gameboy voor me met Pokémon Yellow. Nauwelijks andere spellen.
              </p>
              <p className="opacity-70">
                Je hebt precies nul interesse in videogames—arcadespellen, bordspellen, oké. Maar dit niet. 
                Toch deed je onderzoek. Je vond iets dat complex genoeg was om mee te groeien, 
                iets dat een kind van mijn leeftijd zou uitdagen zonder te overweldigen.
              </p>
              <p className="text-lg mt-4" style={{ color: goldColor }}>
                Je lette op wat ik nodig had, niet op wat jij begreep.
              </p>
            </Memory>

            <PhotoPlaceholder caption="De Gameboy jaren" />

            <Memory>
              <p className="text-lg mb-4">
                Je reed met me het land door voor een Yu-Gi-Oh toernooi. Ik was acht.
              </p>
              <p className="opacity-70">
                Toen we aankwamen was iedereen een volwassene. We keken elkaar aan—dit hadden we allebei niet verwacht. 
                Ik vloog er tenminste niet uit in de eerste ronde. Maar daar gaat het niet om.
              </p>
              <p className="text-lg mt-4" style={{ color: goldColor }}>
                Het punt is dat je het land doorreed voor een kaartspel dat je niet begreep, 
                omdat je zoon het belangrijk vond.
              </p>
            </Memory>

            <Memory>
              <p className="text-lg mb-4">
                Je plaatste me op scholen die op jouw route naar werk lagen.
              </p>
              <p className="opacity-70">
                Niet de dichtstbijzijnde scholen. Niet de handigste. 
                De scholen die betekenden dat je me elke dag kon brengen. 
                Een paar extra minuten samen in de auto, ochtend na ochtend, jaar na jaar.
              </p>
              <p className="text-lg mt-4" style={{ color: goldColor }}>
                Je bouwde tijd met mij in de structuur van je dag.
              </p>
            </Memory>

            <Memory>
              <p className="text-lg mb-4">
                Je bleef een keer op tot 3 uur 's nachts om een level in een Harry Potter spel te halen waar ik vast zat.
              </p>
              <p className="opacity-70">
                Ik werd wakker en je was zo trots. Je had het gedaan. Je had me geholpen. 
                Je liet me het scherm zien alsof je iets veroverd had.
              </p>
              <p className="text-lg mt-4" style={{ color: goldColor }}>
                Je dacht dat het belangrijk voor me was. Dat was het ook.
              </p>
            </Memory>

            <Memory>
              <p className="text-lg mb-4">
                Je droeg me door het middelbaar.
              </p>
              <p className="opacity-70">
                Ik zat te diep in de details. Ik kon het grotere plaatje niet zien—ik verdwaalde, 
                overweldigd door de onderdelen, niet in staat het geheel te zien. 
                Jij zag dat. Je liet me niet verdrinken.
              </p>
              <p className="text-lg mt-4" style={{ color: goldColor }}>
                Je trok me erdoor toen ik mezelf er niet doorheen kon trekken.
              </p>
            </Memory>

            <PhotoPlaceholder caption="Ergens in het middelbaar" />
          </div>
        </section>

        <RestMarker />

        {/* ==================== THE FORTRESS - EXPANDED EMOTIONAL CLIMAX ==================== */}
        <section className="py-32 px-6 print:py-16 print:break-before-page" style={{ background: 'linear-gradient(180deg, rgba(201,162,39,0.08) 0%, rgba(201,162,39,0.03) 50%, rgba(201,162,39,0.08) 100%)' }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-3xl md:text-5xl mb-16 text-center" style={{ color: goldColor, fontVariant: 'small-caps', letterSpacing: '0.15em' }}>
              De Persoon Erachter
            </p>
            
            <div className="space-y-8 opacity-90 text-lg">
              <p>
                Je liet de wereld een logisch fort zien.
              </p>
              <p>
                Systemen. Discipline. Competentie. 
                De man die het had uitgezocht. 
                Degene op wie je kon rekenen om helder te denken wanneer anderen dat niet konden.
              </p>
            </div>

            <PhotoPlaceholder caption="Het fort van buitenaf" />

            <div className="space-y-8 opacity-90 text-lg">
              <p>
                Maar ik zag iets anders.
              </p>
              <p>
                Niet in plaats van het fort—erin. Achter de muren.
              </p>
            </div>

            <div className="my-16 py-12 border-t border-b" style={{ borderColor: 'rgba(201,162,39,0.3)' }}>
              <div className="space-y-6 opacity-90">
                <p className="text-lg">
                  Ik zag een man die het land doorreed voor een kaartspel dat hij niet begreep.
                </p>
                <p className="text-lg">
                  Die opbleef tot drie uur 's nachts om een videogame level te halen.
                </p>
                <p className="text-lg">
                  Die een computer kocht voor een kind dat nog niet kon lezen, 
                  omdat hij een toekomst zag die dat kind zich niet kon voorstellen.
                </p>
                <p className="text-lg">
                  Die tijd met zijn kinderen inbouwde in zijn woon-werkroute.
                </p>
                <p className="text-lg">
                  Die onderzoek deed naar Pokémon terwijl hij er geen interesse in had.
                </p>
                <p className="text-lg">
                  Die zijn zoon door school droeg toen die te diep in de details zat 
                  om zelf de weg eruit te vinden.
                </p>
              </div>
            </div>

            {/* THE THESIS - VISUALLY DISTINCT */}
            <div className="my-20 py-16 text-center">
              <p className="text-2xl md:text-4xl leading-relaxed" style={{ color: goldColor }}>
                Het fort was niet koud.
              </p>
              <div className="my-8 flex justify-center">
                <div className="w-16 h-px" style={{ background: goldColor }}></div>
              </div>
              <p className="text-2xl md:text-4xl leading-relaxed" style={{ color: goldColor }}>
                Het fort was hoe je iets warms beschermde.
              </p>
            </div>

            <PhotoPlaceholder caption="Een onbewaakt moment" />

            <div className="text-center my-16">
              <p className="text-2xl italic opacity-80">
                Ik zie je, Vake.
              </p>
              <p className="text-xl opacity-60 mt-4">
                Niet alleen wat je bouwde. Jou.
              </p>
            </div>

            <div className="space-y-6 opacity-90 text-lg mt-16">
              <p>Je was een geweldige vader.</p>
              <p>
                Niet omdat je perfect was. 
                Omdat je oplette. 
                Omdat je er was. 
                Omdat elk systeem dat je bouwde, elke les die je herhaalde, elke stille keuze die je maakte—het was voor ons. 
                Voor mij.
              </p>
            </div>

            <p className="text-xl mt-12 text-center" style={{ color: goldColor }}>
              Ik wil dat je weet dat ik het weet. En ik wil dat je weet dat het werkte.
            </p>
          </div>
        </section>

        <RestMarker />

        {/* ==================== CARRYING FORWARD + CLOSING (MERGED) ==================== */}
        <section className="min-h-screen flex items-center px-6 py-20 print:min-h-0 print:py-16 print:break-before-page">
          <div className="max-w-xl mx-auto">
            <p className="text-3xl md:text-4xl mb-12" style={{ color: goldColor, fontVariant: 'small-caps', letterSpacing: '0.1em' }}>
              Wat Ik Meedraag
            </p>
            
            <div className="space-y-6 opacity-90">
              <p>
                Ik ben niet het einde van de lijn. Dat was nooit het plan, toch?
              </p>
              <p>
                "Voor hen die na ons komen"—je zei het nooit, maar je leefde het zo volledig dat ik het toch absorbeerde. 
                Ik was een van hen. Nu word ik een van jullie—een zender, niet alleen een ontvanger.
              </p>
              <p>
                Ik ben al begonnen. Defné en ik hebben nu systemen. 
                Financiële architectuur die je zou herkennen—meerdere spaarlagen, 
                opzettelijke weerstand tegen impulsaankopen, 
                geautomatiseerde stromen die draaien zonder aandacht. 
                Ze wist niet dat ze voor jouw filosofie koos toen ze voor een leven met mij koos. 
                Maar dat deed ze. En het werkt.
              </p>
            </div>

            <PhotoPlaceholder caption="Vincent en Defné, of het huis aan de Jagershoek" />

            <div className="space-y-6 opacity-90">
              <p className="text-lg" style={{ color: goldColor }}>
                Als we kinderen hebben, leer ik ze op dezelfde manier als jij mij leerde.
              </p>
              <p>
                Niet met lezingen—je gaf nooit lezingen. 
                Met architectuur. Met systemen. Met zinnen die deel worden van de lucht. 
                Ze zullen het absorberen zoals ik deed: langzaam, onzichtbaar, 
                totdat ze op een dag beseffen dat ze al die tijd jouw code hebben gedraaid.
              </p>
            </div>

            <div className="my-20 text-center">
              <p className="opacity-70 mb-8">
                Als ze me vragen wie me leerde zo te denken—in decennia te plannen, 
                systemen te bouwen in plaats van te vertrouwen op wilskracht, 
                de grond klaar te maken voordat je erop stapt—dan laat ik ze dit zien.
              </p>
              <p className="opacity-70">
                Dan vertel ik ze over jou.
              </p>
            </div>

            <div className="my-16 flex justify-center">
              <div className="w-px h-24" style={{ background: 'linear-gradient(180deg, #c9a227 0%, transparent 100%)' }}></div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-2xl md:text-3xl" style={{ color: goldColor }}>Het werkte, Vake.</p>
              <p className="text-xl opacity-80">De transmissie is aangekomen.</p>
              <p className="text-xl opacity-80">Ik ben klaar om het door te geven.</p>
            </div>

            <PhotoPlaceholder caption="Jullie samen, recent" />
          </div>
        </section>

        {/* ==================== SIGNATURE ==================== */}
        <section className="py-24 text-center print:py-12">
          <div className="opacity-40">
            <p className="mb-2">Met liefde,</p>
            <p className="text-xl italic">Vincent</p>
          </div>
        </section>

        <div className="h-16 print:h-0"></div>
      </div>
    </>
  );
}