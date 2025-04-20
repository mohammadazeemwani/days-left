import React, { type ReactElement } from "react";
import type { Route } from "./+types/home";
import { useScreenSize } from "~/hooks/use-screen-size";
import { getDaysInYear, range } from "~/helper/helper";
import { getDaysLeftInYear } from "~/helper/helper";
import { useWindowSize } from "~/hooks/use-window-size";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Remain" },
    { name: "description", content: "See visually how many days of year remain" },
  ];
}

type DaysData = {
  total: number,
  left: number, 
}

export default function Home() {
  const [containerNode, setContainerNode] = React.useState<HTMLElement | null>(null);
  const size = useWindowSize({ alter: { x: -10, y: -30 }});
  const [daysData, setDaysData] = React.useState<DaysData>();
  const [circleDiameter, setCircleDiameter] = React.useState(0)
  const [gridDim, setGridDim] = React.useState<{ columnSize: number, rowSize: number} | null>(null)
  const containerRef = React.useCallback((node: HTMLElement | null) => {
    if (node!==null) {
      console.log({ node })
      setContainerNode(node)
    }
  }, []);

  React.useEffect(() => {
    if (!size || !containerNode) return
    const days = getDaysInYear(new Date().getFullYear())
    let a = Math.sqrt((size.x * size.y)/days) // we will keep the gutter(gap) like 0.2% of a. 
    // a = Math.trunc(a);
    setCircleDiameter(a);
    setDaysData({
      total: days,
      left: getDaysLeftInYear()
    })
    const newSizeX = size.x - size.x%a; // truncated a.
    const gridColumnSize = newSizeX / a;

    const newSizeY = size.y - size.y%a; // truncated a.
    // newSizeY right now gives int when divided by 'a'.
    // but this int should give 'days in year' when 'newSizeY / a' is multiplied by gridColumnSize
    // make it the nearest int that does so.
    // this logic will reside here...

    // this should remain same
    const gridRowSize = newSizeY / a;

    console.log(a, size)
    setGridDim({
      columnSize: gridColumnSize,
      rowSize: gridRowSize,
    })

    // Container dimentions change
    containerNode.style.width = `${size.x}px`
    containerNode.style.height = `${newSizeY}px`

    
  }, [size, containerNode])

  return (
    <>
    <div
      className="mx-auto grid"
      style={{
        gridTemplateColumns: `repeat(${gridDim?.columnSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridDim?.rowSize}, 1fr)`,
      }}
      ref={containerRef}
      >
      {
        size && daysData && (
          <>
          {range(1, daysData.total - daysData.left).map((count) => {
            return (
              <span 
              key={count} 
              className={`rounded-full aspect-square bg-zinc-600`}
              style={{ 
                // width: `${circleDiameter}px`
              }}
              ></span>
            )
          })}
          {range(1, daysData.left).map((count) => {
            return (
              <span 
              key={count} 
              className={`rounded-full aspect-square bg-white/92`}
              style={{ 
                // width: `${circleDiameter}px `
              }}
              ></span>
            )
          })}
          </>
        )
      }
    </div>
    </>
  );
}