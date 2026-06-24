import "../Island.css";

import islandr from "../assets/islandr.png";
import pinetreer from "../assets/pinetreer.png";
import flowerr from "../assets/flowerr.png";
import cottager from "../assets/cottager.png";
import campfirer from "../assets/campfirer.png";

const TILE_W = 88;
const TILE_H = 44;

const ORIGIN_X = 450;
const ORIGIN_Y = 110;

function tileToPos(col, row) {
  const x = ORIGIN_X + (col - row) * TILE_W;
  const y = ORIGIN_Y + (col + row) * TILE_H;

  return {
    left: `${x}px`,
    top: `${y}px`,
  };
}

export default function Island() {
  const xp = 1400;

  return (
    <div className="island-page">
      <div className="header">
        

      
      </div>

      <div className="island-container">
        <img src={islandr} alt="" className="island-base" />

        {/* Tree Top */}
        <img
          src={pinetreer}
          alt=""
          className="tree"
          style={tileToPos(1, 0)}
        />

        {/* Tree Left */}
        <img
          src={pinetreer}
          alt=""
          className="tree"
          style={tileToPos(0, 1.8)}
        />

        {/* House Center */}
        <img
          src={cottager}
          alt=""
          className="house"
          style={tileToPos(2, 2)}
        />

        {/* Left Flowers */}
        <img
          src={flowerr}
          alt=""
          className="flower"
          style={tileToPos(0, 3.5)}
        />

        {/* Right Flowers */}
        <img
          src={flowerr}
          alt=""
          className="flower"
          style={tileToPos(2.65, 1.75)}
        />

        {/* Campfire */}
        <img
          src={campfirer}
          alt=""
          className="campfire"
          style={tileToPos(2, 3)}
        />

        {/* Bottom Flowers */}
        <img
          src={flowerr}
          alt=""
          className="flower"
          style={tileToPos(3.5, 3.5)}
        />

        {/* Bottom Tree */}
        <img
          src={pinetreer}
          alt=""
          className="tree"
          style={tileToPos(2.7, 3.56)}
        />
      </div>
    </div>
  );
}