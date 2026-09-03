import { useEffect } from "react";
import { getJamendoTracks } from "../api/jamendo";

function JamendoTest() {
    useEffect(() => {
        getJamendoTracks({
            year: 2009,
            limit: 5,
        })
            .then((tracks) => {
                console.log(tracks);
            })
            .catch(console.error);
    }, []);

    return <div>Check console</div>;
}

export default JamendoTest;