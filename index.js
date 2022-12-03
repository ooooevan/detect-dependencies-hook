import { useRef, useEffect } from 'react';
export const useDetectDependencyEffect = (effect, dependencies, diffCallback) => {
    const prevRef = useRef(dependencies || []);
    const diffs = [];
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
//# sourceMappingURL=index.js.map