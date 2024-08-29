import { RunConfig } from "../models/interfaces";

export const runConfigResolver = (runConfig: RunConfig): RunConfig => {
    runConfig.targets = runConfig.targets || [];
    runConfig.bookSettings = runConfig.bookSettings || { categories: [] };
    return runConfig;
  }