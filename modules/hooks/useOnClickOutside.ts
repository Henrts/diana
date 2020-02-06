import { useEffect } from "react";

function useOnClickOutside(
    ref: React.RefObject<HTMLElement | undefined>,
    onClickOutside: (target: HTMLElement) => void,
) {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (ref.current && !ref.current.contains(target)) {
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
