import { useCallback, useMemo, useState } from "react";
import { NodeField } from "../nodes/nodeAbstract.tsx";

export const useNodeState = (fields: NodeField[]) => {

  console.log("hook called");

  const initialState = useMemo(
    () => fields?.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || '';
      return acc;
    }, {} as Record<string, string>),
    [fields]
  );

  const [state, setState] = useState<Record<string, string>>(initialState);

  const handleChange = useCallback((field: string, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  return { state, handleChange };
}
