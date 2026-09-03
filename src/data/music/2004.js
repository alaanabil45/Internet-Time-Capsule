import { getJamendoMusic } from "./jamendoMusic";

export async function loadMusic2004() {
    return getJamendoMusic({
        year: 2004,
        limit: 5,
        tags: "pop",
    });
}

export default loadMusic2004;