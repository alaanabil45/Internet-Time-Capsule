import { getJamendoMusic } from "./jamendoMusic";

export async function loadMusic2009() {
    return getJamendoMusic({
        year: 2009,
        limit: 5,
        tags: "rock",
    });
}

export default loadMusic2009;