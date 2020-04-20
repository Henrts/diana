import React from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

export const MenuDirectionsStory = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Menu renderHeader={() => <button>Toggle Bottom</button>}>
        <MenuItem icon={"add"} onClick={() => console.log("clicked")}>
          Menu Item 1
        </MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </Menu>
      <br />
      <br />
      <Menu
        renderHeader={() => <button>Toggle Right</button>}
        direction={"right"}
      >
        <MenuItem icon={"add"} onClick={() => console.log("clicked")}>
          Menu Item 1
        </MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </Menu>
      <br />
      <br />
      <Menu
        renderHeader={() => <button>Toggle Left</button>}
        direction={"left"}
      >
        <MenuItem icon={"add"} onClick={() => console.log("clicked")}>
          Menu Item 1
        </MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </Menu>
      <br />
      <br />
      <Menu renderHeader={() => <button>Toggle Top</button>} direction={"top"}>
        <MenuItem icon={"add"} onClick={() => console.log("clicked")}>
          Menu Item 1
        </MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </Menu>
      <br />
      <br />
      <Menu
        renderHeader={() => <button>Bottom Right</button>}
        direction={"bottom-right"}
      >
        <MenuItem icon={"add"} onClick={() => console.log("clicked")}>
          Menu Item 1
        </MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </Menu>
      <br />
      <br />
      <Menu
        renderHeader={() => <button>Top Right</button>}
        direction={"top-right"}
      >
        <MenuItem icon={"add"} onClick={() => console.log("clicked")}>
          Menu Item 1
        </MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </Menu>
    </div>
  );
};
