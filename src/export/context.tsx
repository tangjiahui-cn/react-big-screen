import React from "react";
import { Engine } from "@/engine";
import { RbsEngine } from "@/export/index";

export type EngineContextType = {
  engine: Engine;
  rbsEngine?: RbsEngine;
};

export const EngineContext = React.createContext<EngineContextType>({
  engine: undefined as any,
  rbsEngine: undefined,
});

export function useEngineContext() {
  return React.useContext(EngineContext);
}
