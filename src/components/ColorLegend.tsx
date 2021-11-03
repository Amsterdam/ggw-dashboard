import { CATEGORY_COLORS, COLOR } from "../services/colorcoding";
import "./ColorLegend.scss";

const ColorLegend = () => {
  const getBulletStyle = (entry) => {
    const style = {
      backgroundColor: entry.color,
      color: entry.color,
    };
    if (entry.color === COLOR["ams-wit"]) {
      style["borderColor"] = COLOR["ams-zwart"];
    }
    return style;
  };

  return (
    <div>
      <h4>Betekenis kleuren</h4>
      <div className="legend">
        {CATEGORY_COLORS.map((entry, index) => {
          return (
            <div key={index} className="legend-entry">
              <span style={getBulletStyle(entry)} className="legend-bullet">
                &#9634;
              </span>
              {entry.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorLegend;
