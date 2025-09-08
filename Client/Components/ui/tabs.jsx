import React, { createContext, useContext, useState } from "react";

const TabsContext = createContext();

export function Tabs({ children, defaultValue = null, className = "" }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children, className = "" }) {
  const ctx = useContext(TabsContext);
  const active = ctx?.value === value;
  return (
    <button
      onClick={() => ctx?.setValue(value)}
      className={className + (active ? " active" : "")}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }) {
  const ctx = useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return <div className={className}>{children}</div>;
}

export default Tabs;
