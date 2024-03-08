import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface TabProps<T> {
  children?: React.ReactNode;
  selected: number;
  values: T[];
  setSelection: React.Dispatch<React.SetStateAction<number>>;
}

function a11yProps(index: number) {
  return {
    "id": `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function BasicTabs<T extends { id: number; name: string }>(props: TabProps<T>) {
  const { children, selected, values, setSelection } = props;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelection(newValue);
  };

  return (
    <>
      <Tabs value={selected} onChange={handleChange} aria-label='basic tabs example'>
        {values.map((item) => (
          <Tab key={`simple-tab${item.id}`} label={item.name} {...a11yProps(item.id)} />
        ))}
      </Tabs>
      {children}
    </>
  );
}
