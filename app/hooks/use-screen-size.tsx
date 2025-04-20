import React from "react";

type UseScreenSize = {
  x: number;
  y: number;
} | null;

export function useScreenSize(ref?: HTMLElement | null) {
  const [size, setSize] = React.useState<UseScreenSize>(null);

  React.useEffect(() => {
    if (!ref) return; // If ref is null, return early.
    console.log("size")

    function handleResize() {
      const width = ref?.offsetWidth ?? window.innerWidth;
      const height = ref?.offsetHeight ?? window.innerHeight;

      setSize({ x: width, y: height });
    }

    // Call it initially
    handleResize();

    // Add the event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]); // Dependency array includes the ref

  return size;
}

