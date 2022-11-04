import { Button, Text } from "@mantine/core";
import HUD from "../components/HUD";

import createStore from "zustand";
import { persist } from "zustand/middleware";

interface BearState {
  bears: number;
  increase: (by: number) => void;
  reset: () => void;
}

const useBearStore = createStore<BearState>()(
  persist(
    (set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
      reset: () => set((state) => ({ bears: (state.bears = 0) })),
    }),
    {
      name: "bear-storage",
    }
  )
);

export default function BattlePage() {
  const bearCount: number = useBearStore((state) => state.bears);
  const clickMore = useBearStore((state) => state.increase);
  const reset = useBearStore((state) => state.reset);

  return (
    <>
      <HUD />
      <Text>Battle Page</Text>
      <Button>Its a button</Button>
      <Text>Bears is {bearCount}</Text>
      <Button onClick={() => clickMore(1)}>Moar Bears</Button>
      <Button onClick={reset}>None Bears</Button>
    </>
  );
}
