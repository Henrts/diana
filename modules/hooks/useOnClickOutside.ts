import { useEffect } from "react";

function useOnClickOutside(
  refs: React.RefObject<HTMLElement | undefined>[],
  onClickOutside: (target: HTMLElement) => void
) {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    const hasClickedOutside = refs.every(
      ref => ref.current && !ref.current.contains(target)
    );

    if (hasClickedOutside) {
      onClickOutside(target);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

export default useOnClickOutside;
