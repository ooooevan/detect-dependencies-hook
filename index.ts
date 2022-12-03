import React, { useRef, useEffect, EffectCallback, DependencyList } from 'react';

export const useDetectDependencyEffect = (effect: EffectCallback, dependencies: DependencyList, diffCallback?: (diffs: any[]) => void) => {
  const prevRef = useRef<DependencyList>(dependencies || []);

  const diffs: any[] = [];
  useEffect(() => {
    prevRef.current.forEach((prevDep, i) => {
      if (dependencies[i] !== prevDep) {
        diffs[i] = {
          before: prevDep,
          after: dependencies[i]
        };
      }
    });
    if (diffs.length) {
      diffCallback && diffCallback(diffs);
    }
    effect();
    prevRef.current = dependencies;
  }, dependencies);
};
