export function CheckSideEffect({
  name,
  debuffs,
  setDebuffs,
  toast,
  setBalance,
  updatedItems,
  level,
  idx,
  setUserMps,
  MPS,
  userMps,
  multiplier,
  balance,
  price,
}) {
  if (name === "Upgrade Taps") {
    const dice = Math.random();
    if (dice <= 0.05) {
      toast({
        title: "Muscle Strain! Your taps are disabled for 20 seconds",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      const tempDebuffs = [...debuffs];
      if (tempDebuffs[0].applied) {
        tempDebuffs[0].duration = 20;
      } else {
        tempDebuffs[0].applied = true;
        tempDebuffs[0].duration = 20;
        if (tempDebuffs[0].duration) {
          let intervalId;
          intervalId = setInterval(() => {
            if (tempDebuffs[0].duration >= 0) {
              tempDebuffs[0].duration = tempDebuffs[0].duration - 0.1;
              setDebuffs(tempDebuffs);
            } else {
              const tempDebuffs = [...debuffs];
              tempDebuffs[0].applied = false;
              setDebuffs(tempDebuffs);
              clearInterval(intervalId);
            }
          }, 100);

          return () => {
            clearInterval(intervalId);
          };
        }
      }
    }
  } else if (name === "Small business") {
    const dice = Math.random();
    if (level <= 0) {
    } else if (dice <= 0.12) {
      toast({
        title: "Your Small business caught fire!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      updatedItems[idx].level = level - 1;
      setUserMps(userMps - MPS * 1);
    }
  } else if (name === "Work") {
    const dice = Math.random();
    if (dice <= 0.12) {
      toast({
        title: "You got fired!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      updatedItems[idx].level = 0;
      updatedItems[idx].price = 10000;
      setUserMps(userMps - MPS * level);
    }
  } else if (name === "Stock Market") {
    const dice = Math.random();
    if (dice <= 0.2) {
      toast({
        title: "Your stonks went downhill!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      updatedItems[idx].multiplier = multiplier - 20;
      let deduct = (MPS * level) / 5;
      console.log(MPS * level * ((multiplier - 20) / 100));
      console.log(deduct);
      console.log(userMps - deduct);
      if (deduct) {
        setUserMps(userMps - deduct);
      }
    }
  } else if (name === "Bank") {
    const dice = Math.random();
    if (dice <= 0.2) {
      toast({
        title: "Your Bank got robbed! and also destroyed somehow",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      updatedItems[idx].level = level;
      setUserMps(userMps);
      setBalance(Math.round((balance - price) / 2));
    }
  }
}
