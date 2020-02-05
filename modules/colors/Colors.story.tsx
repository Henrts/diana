import React from 'react';
import { ThemeStyleSheetFactory } from '../types/types';
import { useStyles, useTheme } from '../base';
import { H3 } from '../typography/Typography';
import { defaultPalette } from '../tokens/palettes';

export const Colors = () => {
  const theme = useTheme();

  const colors: any = [];
  Object.keys(theme.colors).map(key => {
    colors.push(key);
  });
  return (
    <table className="colors-table">
      <tbody>
        {colors.map((colorName: any) => (
          <tr key={colorName} className="row">
            <td>
              <H3>
                {colorName.charAt(0).toUpperCase() + colorName.substring(1)}
              </H3>
            </td>
            <td>
              <ColorDiv color={colorName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styleSheet: ThemeStyleSheetFactory = theme => {
  let res: any = {};
  Object.keys(theme.colors).map((key: string) => {
    const t: any = theme.colors;
    const isObject = typeof t[key] !== 'string';
    if (isObject) {
      res[`${key}25`] = {
        backgroundColor: t[key][`${key}25`],
      };
      res[`${key}50`] = {
        backgroundColor: t[key][`${key}50`],
      };
      res[`${key}100`] = {
        backgroundColor: t[key][`${key}100`],
      };
    } else {
      res[key] = {
        backgroundColor: t[key],
      };
    }
  });
  return res;
};

interface IColorsProps {
  color: keyof typeof defaultPalette;
}
const ColorDiv: React.FC<IColorsProps> = ({ color }) => {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();
  const isObject = typeof theme.colors[color];
  return isObject === 'string' ? (
    <div className="color-div-container">
      <div className={cx(styles[color], 'color-div')} />
    </div>
  ) : (
    <div className="color-div-container">
      <div className={cx(styles[`${color}25`], 'color-div')} />
      <div className={cx(styles[`${color}50`], 'color-div')} />
      <div className={cx(styles[`${color}100`], 'color-div')} />
    </div>
  );
};
