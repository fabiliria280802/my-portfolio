import { useEffect, useState } from "preact/hooks";

export default function LanguageSwitcher() {
    const [loc, setLoc] = useState("en");
    useEffect(() => {
        const current = location.pathname.split("/")[1] || "en";
        setLoc(current);
    }, []);

    function changeLocale(next: string) {
        const parts = location.pathname.split("/");
        parts[1] = next; // swap locale segment
        location.assign(parts.join("/"));
    }

    return (
        <select value={loc} onChange={(e) => changeLocale((e.target as HTMLSelectElement).value)} aria-label="Language">
            <option value="en">English</option>
            <option value="es">Español</option>
        </select>
    );
}