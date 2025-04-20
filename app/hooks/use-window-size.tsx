import React from "react";

type Size = {
    x: number;
    y: number;
  } | null;

type UseWindowSize = {
    alter?: { x: number, y: number} // percent to alter in x and y 
    //IMP: size.x and size.y at last should be integers, not with decimals
}   

export function useWindowSize({alter={x: 0, y: 0} }: UseWindowSize) {
    const [size, setSize] = React.useState<Size>(null);
    
    React.useEffect(() => {
        function handleSizeChange() {
            setSize({
                x: Math.trunc(window.screen.width + (window.screen.width/100 * alter.x)),
                y: Math.trunc(window.screen.height + (window.screen.height/100 * alter.y)),
            })
        }
        handleSizeChange()

        addEventListener('resize', handleSizeChange);

        return () => {
            removeEventListener('resize', handleSizeChange)
        }
    }, [])

    return size;
}