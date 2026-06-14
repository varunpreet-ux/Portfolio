import { useEffect, useRef, useState } from 'react';

// New high-fidelity 80x58 ASCII art representation for Varunpreet
const VARUNPREET_PORTRAIT = [
  "-----------------------------------------------------------------------------...",
  "------------------------------------------------------------------------------..",
  "------------------------------------------------------------------------------..",
  "----------------------------------+++++--+++++----------------------------------",
  "-------------------------+++++++++++++++++----...--+----------------------------",
  "-----------------------+++++++++++-..................---------------------------",
  "---------------------+++++++++-........................--++---------------------",
  "-------------------++++++++-.............................-+++-------------------",
  "--------------+++++++++++-................................-++++-----------------",
  "--------------+++++++++-...............................   .-++------------------",
  "--------------++++++++-.....................      ......... -++-----------------",
  "-----------++++++++++-.....................    .......   ....+++++--------------",
  "----------++++++++++-.................... ...............  ...++++--------------",
  "----------++++++++++.......................................  .-++++-------------",
  "----------+++++++++-...................+++............. ....  -++++-------------",
  "---------++++++++++.  ...............+++##+-............. ... .+++++------------",
  "--------+++++++++++.   . ...........#########.............   ..++++++-----------",
  "-------++++++++++++.    ..........+###########-....... ...    .++++++-----------",
  "--------+++++++++++.     .......-+############++....... ...   -+++++++----------",
  "-------++++++++++++.   . ...........-+####++....-......  ..   ++++++++----------",
  "------+++++++++++++-       ..-+++++-+--++----+++++-....      -+++++++-----------",
  "-------+++++++++++++.    .. -+--+..+-+-+#-+--+..--+-...     .+++++++------------",
  "------+++++++++++++++.     .+++++++++++##+++++++++++-..    .+++++++++-----------",
  "-------+++++++++++++++.    -+########+####++########+.   ..++++++++++-----------",
  "-------++++++++++++++++.   +++#######+####++########+-   -++++++++++++----------",
  "-------+++++++++++++++++- .-++######+-.++.-+#######++-  -+++++++++++++----------",
  "-------++++++++++++++++++-..-++####++--++--+######++-..++++++++++++++-----------",
  "-------++++++++++++++++++-. .-++-.....++++-....+#++-. .-++++++++++++++----------",
  "--------+++++++++++++++++-.  ..---+++++++++----.---.  .-++++++++++++++----------",
  "---------++++++++++++++++-..  ..-+++++---++++#++-..   .-++++++++++++++----------",
  "--------+++++++++++++++++-.     ...-+++--+++++-..    ..-+++++++++++++-----------",
  "---------+++++++++++++++++-.       ........... .     ..-+++++++++++++-----------",
  "---------+++++++++++++++++-..           .            .-+++++++++++++++----------",
  "----------+++++++++++++++++-.  .                   ..   +++++++++++-------------",
  "----------+++++++++++++++-. .  ..   .               .-.   -++++++++++-----------",
  "-----------++++++++++-.    ...   .               . .--       .-++++-------------",
  "------------+++++-.         -..        .        . .-+-           .--------------",
  "--------------..       .     --...               .-+-               ..----------",
  "----------.                   .-.              ..--.                 .   .------",
  "------.                           ..         ....                            .--",
  "---.        .                           .            .  .                       ",
  "-                                                                               ",
  " .         .             .      .         .                     .    .          ",
  "               .                     .    .                                  .. ",
  "                                    .      .    .   .                           ",
  "                 .            .  .          .        . .                        ",
  "             .  .                                             .       .      .  ",
  "             .       .                                  .    .                 .",
  "               .                                        .                      .",
  "      .  ..      .  .      .     .                                              ",
  "  .                      .         .                                      .     ",
  ".                                               .                               ",
  "   .              .          .                                    . .           ",
  "                  .           .   .     .               .    .                  ",
  "            .                                                                   ",
  "    .        .    .  .                        .  .     .           .            ",
  "        .                                                    .  .               ",
  "  . .                 .                 .       .     .     .   .  ."
];

export default function AsciiArtPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [colorProgress, setColorProgress] = useState(0); // Smooth color interpolation back and forth

  // Animate the text color selection (from soft zinc grey to bright white on interactions)
  useEffect(() => {
    let frameId: number;
    const target = isHovered ? 1 : 0;
    
    const tick = () => {
      setColorProgress((prev) => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.01) {
          return target;
        }
        return prev + diff * 0.15; // Smooth spring dampening
      });
      frameId = requestAnimationFrame(tick);
    };
    
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isHovered]);

  // High-performance canvas layout drawer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = 80;
    const rows = 58;

    // Retina-sharp baseline cells definition for high DPI
    const cellWidth = 12;
    const cellHeight = 18;

    canvas.width = cols * cellWidth;
    canvas.height = rows * cellHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Color mixing: zinc-300 (#D4D4D8 RGB: 212, 212, 216) to full white (#FFFFFF RGB: 255, 255, 255)
    // We blend colors: dark-gray (130, 130, 135) to full active white (255, 255, 255)
    const r = Math.round(150 + (255 - 150) * colorProgress);
    const g = Math.round(150 + (255 - 150) * colorProgress);
    const b = Math.round(155 + (255 - 155) * colorProgress);
    
    ctx.font = '700 13px "JetBrains Mono", "Courier New", Courier, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let rIdx = 0; rIdx < rows; rIdx++) {
      const line = VARUNPREET_PORTRAIT[rIdx] || '';
      for (let cIdx = 0; cIdx < cols; cIdx++) {
        const char = line[cIdx];
        if (!char || char === ' ') continue;

        // Give the background shading texture a lower brightness/contrast to enhance the portrait depth
        if (char === '-') {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.05 + colorProgress * 0.08})`;
        } else if (char === '.') {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.15 + colorProgress * 0.15})`;
        } else if (char === '#' || char === '+') {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.75 + colorProgress * 0.25})`;
        } else {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.4 + colorProgress * 0.4})`;
        }

        const x = cIdx * cellWidth + cellWidth / 2;
        const y = rIdx * cellHeight + cellHeight / 2;
        ctx.fillText(char, x, y);
      }
    }
  }, [colorProgress]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative flex items-center justify-center select-none overflow-hidden"
      id="ascii-portrait-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas 
        ref={canvasRef}
        id="ascii-art-canvas"
        className="w-full h-full object-contain cursor-pointer transition-transform duration-500 hover:scale-[1.01]"
        style={{
          aspectRatio: '80/58',
          maxWidth: '100%',
          maxHeight: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}
