import React from "react";
import Menu, {
  // @ts-ignore
  typesLoaderProps as MenuPropTypes,
  // @ts-ignore
  typesLoaderStyles as MenuStyleTypes
} from "./Menu";
import MenuItem, {
  // @ts-ignore
  typesLoaderProps as MenuItemPropTypes,
  // @ts-ignore
  typesLoaderStyles as MenuItemStyleTypes
} from "./MenuItem";
import { typesHighlight } from "../../.storybook/helpers";

const { Props: MenuProps, Styles: MenuStyles } = typesHighlight(MenuPropTypes, MenuStyleTypes);
export { MenuProps, MenuStyles };

const { Props: MenuItemProps, Styles: MenuItemStyles } = typesHighlight(
  MenuItemPropTypes,
  MenuItemStyleTypes
);
export { MenuItemProps, MenuItemStyles };

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
      <Menu renderHeader={() => <button>Toggle Right</button>} direction={"right"}>
        <MenuItem icon={"add"} onClick={() => console.log("clicked")}>
          Menu Item 1
        </MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </Menu>
      <br />
      <br />
      <Menu renderHeader={() => <button>Toggle Left</button>} direction={"left"}>
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
      <Menu renderHeader={() => <button>Bottom Right</button>} direction={"bottom-right"}>
        <MenuItem icon={"add"} onClick={() => console.log("clicked")}>
          Menu Item 1
        </MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </Menu>
      <br />
      <br />
      <Menu renderHeader={() => <button>Top Right</button>} direction={"top-right"}>
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
