import { getJamendoMusic } from "./jamendoMusic";

export async function loadMusic2012() {
    return getJamendoMusic({
        year: 2012,
        limit: 5,
        tags: "indie",
    });
}

export default loadMusic2012;