import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import TimeTransition from "./components/TimeTransition/TimeTransition";
import BootScreen from "./components/Boot/BootScreen";
import Awakening from "./components/Boot/Awakening";
import YearSelector from "./components/YearSelector/YearSelector";
import EnteringYear from "./components/YearSelector/EnteringYear";
import Desktop from "./components/Desktop/Desktop";
import useIsMobile from "./hooks/useIsMobile";
import MobileHome from "./components/mobile/MobileHome";
import { yearData } from "./data/years/index";
import { getJamendoTracks } from "./api/jamendo";

function App() {
  const [stage, setStage] = useState("boot");
  const [selectedYear, setSelectedYear] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [transitioningTo, setTransitioningTo] = useState(null);
  const isMobile = useIsMobile();

  const changeYearFromDesktop = (year) => {
    if (year === currentYear) {
      return;
    }

    setTransitioningTo(year);
    setStage("time-transition");
  };

  const shutdownDesktop = () => {
    setCurrentYear(null);
    setStage("years");
  };

  let content;

  if (stage === "boot") {
    content = (
      <BootScreen
        onComplete={() => setStage("awakening")}
      />
    );
  } else if (stage === "awakening") {
    content = (
      <Awakening
        onComplete={() => setStage("years")}
      />
    );
  } else if (stage === "years") {
    content = (
      <YearSelector
        onSelect={(year) => {
          if (year === currentYear) {
            return;
          }

          setSelectedYear(year);
          setTransitioningTo(year);
          setStage("time-transition");
        }}
      />
    );
  } else if (stage === "time-transition") {
    content = (
      <TimeTransition
        fromYear={currentYear || 2012}
        toYear={transitioningTo}
        onComplete={() => {
          setCurrentYear(transitioningTo);
          setSelectedYear(transitioningTo);
          setStage("desktop");
        }}
      />
    );

  } else if (stage === "entering") {
    content = (
      <EnteringYear
        year={selectedYear}
        onComplete={() => setStage("desktop")}
      />
    );
  } else {
    content = isMobile ? (
      <MobileHome
        year={currentYear}
        yearData={yearData[currentYear]}
        onChangeYear={changeYearFromDesktop}
        onShutdown={shutdownDesktop}
      />
    ) : (
      <Desktop
        year={currentYear}
        yearData={yearData[currentYear]}
        onChangeYear={changeYearFromDesktop}
        onShutdown={shutdownDesktop}
      />
    );
  }


  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          className="min-h-screen"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;