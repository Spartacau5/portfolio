'use client';

import { useEffect, useState, useMemo } from 'react';

interface PathData {
  d: string;
  fill?: string;
  fillOpacity?: string;
  fillRule?: string;
  clipRule?: string;
  delay: number;
  originX: number;
  originY: number;
}

export function MicrosoftGraffiti({ isHovered }: { isHovered: boolean }) {
  const [paths, setPaths] = useState<PathData[]>([]);

  useEffect(() => {
    fetch('/images/msoftbg.svg')
      .then(res => res.text())
      .then(text => {
        // Parse paths from SVG - match entire path tags
        const pathTagRegex = /<path[^>]*\/>/g;
        const extractedPaths: PathData[] = [];
        let pathMatch;

        while ((pathMatch = pathTagRegex.exec(text)) !== null) {
          const pathTag = pathMatch[0];

          // Extract individual attributes
          const dMatch = pathTag.match(/d="([^"]*)"/);
          const fillMatch = pathTag.match(/\bfill="([^"]*)"/);
          const fillOpacityMatch = pathTag.match(/fill-opacity="([^"]*)"/);
          const fillRuleMatch = pathTag.match(/fill-rule="([^"]*)"/);
          const clipRuleMatch = pathTag.match(/clip-rule="([^"]*)"/);

          if (!dMatch) continue;

          const d = dMatch[1];

          // Extract first coordinate to estimate position
          const coordMatch = d.match(/M?\s*([\d.]+)[,\s]+([\d.]+)/);
          let x = 720, y = 282; // Default to center
          if (coordMatch) {
            x = parseFloat(coordMatch[1]);
            y = parseFloat(coordMatch[2]);
          }

          // Calculate distance from center (1440x564 viewport, center is 720, 282)
          const centerX = 720;
          const centerY = 282;
          const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
          const maxDistance = Math.sqrt(Math.pow(720, 2) + Math.pow(282, 2)); // ~777

          // Edges start immediately (0 delay), center has small delay
          // This creates the effect of animation spreading from edges to center
          const normalizedDelay = (1 - distance / maxDistance) * 0.25;

          // Calculate origin as percentage for transform-origin
          // Use the starting point of the path relative to viewbox
          const originXPercent = (x / 1440) * 100;
          const originYPercent = (y / 564) * 100;

          extractedPaths.push({
            d,
            fill: fillMatch ? fillMatch[1] : undefined,
            fillOpacity: fillOpacityMatch ? fillOpacityMatch[1] : undefined,
            fillRule: fillRuleMatch ? fillRuleMatch[1] : undefined,
            clipRule: clipRuleMatch ? clipRuleMatch[1] : undefined,
            delay: normalizedDelay,
            originX: originXPercent,
            originY: originYPercent
          });
        }

        setPaths(extractedPaths);
      });
  }, []);

  // Sort paths by delay for rendering order
  const sortedPaths = useMemo(() => {
    return [...paths].sort((a, b) => a.delay - b.delay);
  }, [paths]);

  if (paths.length === 0) return null;

  return (
    <svg
      className="microsoft-graffiti-svg"
      viewBox="0 0 1440 564"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <clipPath id="graffitiClip">
          <rect x="0" y="0" width="1440" height="564" />
        </clipPath>
      </defs>
      <g clipPath="url(#graffitiClip)">
        {sortedPaths.map((path, index) => (
          <path
            key={index}
            d={path.d}
            fill={path.fill || '#000'}
            fillOpacity={path.fillOpacity}
            fillRule={path.fillRule as 'nonzero' | 'evenodd' | undefined}
            clipRule={path.clipRule as 'nonzero' | 'evenodd' | undefined}
            className={`graffiti-path ${isHovered ? 'animate-in' : 'animate-out'}`}
            style={{
              '--delay': `${path.delay}s`,
              '--exit-delay': `${0.25 - path.delay}s`,
              '--origin-x': `${path.originX}%`,
              '--origin-y': `${path.originY}%`
            } as React.CSSProperties}
          />
        ))}
      </g>
    </svg>
  );
}
