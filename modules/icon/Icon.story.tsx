import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import "../../stories/style.scss";
import { ButtonText } from "@diana/typography";
import { useTheme } from "aesthetic-react";
import { TextInput } from "@diana/textinput";

export const IconGallery: React.FC = () => {
  const theme = useTheme();
  const [searchString, setSearchString] = useState("");
  const [icons, setIcons] = useState<string[]>([]);

  useEffect(() => {
    if (theme.icons) {
      if (!searchString || searchString.length === 0) {
        setIcons(Object.keys(theme.icons));
      } else {
        setIcons(
          Object.keys(theme.icons).filter((f: string) =>
            f.includes(searchString),
          ),
        );
      }
    }
  }, [theme.icons, searchString]);

  return (
    icons && (
      <>
        <TextInput
          label="Search Icons"
          onChange={e => setSearchString(e.target.value)}
        />
        <div className="icon-gallery">
          {icons.map((d: string) => (
            <div className="icon-container">
              <Icon name={d} size={20} />
              <ButtonText>{d}</ButtonText>
            </div>
          ))}
        </div>
      </>
    )
  );
};
