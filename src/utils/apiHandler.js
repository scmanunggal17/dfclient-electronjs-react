let prevAntSpace = 0; //? is safe prev state necessary?
export const API_URL = "http://192.168.17.17:8087";
// export const API_URL = "http://localhost:3000";

export const setFreqApi = async (data) => {
  try {
    const response = await fetch(API_URL + "/api/settings/freq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      const jsonResponse = await response.json();
      console.log("setFreqApi Success: ", jsonResponse);
    }
  } catch (error) {
    console.error("Error setFreqApi: ", error);
  }
};

export const setAntena = async (antSpace) => {
  if (prevAntSpace === antSpace) {
    console.log("setAntenna: Antenna spacing is already set to ", antSpace);
    return;
  }

  let typeAnt = "vhf";
  if (antSpace <= 0.25) {
    typeAnt = "uhf";
  }

  try {
    const response = await fetch(API_URL + "/api/ant/" + typeAnt, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const jsonResponse = await response.json();
      console.log("setAntenna Success: ", jsonResponse);
      prevAntSpace = antSpace;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const turnOffDF = async () => {
  setTimeout(() => {
    console.log("Turning Off DF");
    window.NodeFn.closeApp();
  }, 2000);
  try {
    const response = await fetch(API_URL + "/api/shutdown", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error turnOffDF: ", error);
  }
};

export const restartDF = async () => {
  setTimeout(() => {
    console.log("Restarting DF");
    window.NodeFn.closeApp();
  }, 2000);
  try {
    const response = await fetch(API_URL + "/api/restart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error RestartDF: ", error);
  }
};

export const setStationId = async (nameId) => {
  const stationId = {
    id: nameId,
  };
  try {
    const response = await fetch(API_URL + "/api/settings/station_id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stationId),
    });
    if (response.status === 200) {
      const jsonResponse = await response.json();
      console.log("setStationId Success: ", jsonResponse);
    }
  } catch (error) {
    console.error("Error setStationId: ", error);
  }
};

export const readCompass = async () => {
  const response = await fetch(`${API_URL}/api/compass`);
  if (!response.ok) {
    throw new Error("Error reading compass");
  }
  return await response.json();
};

export const readGPS = async () => {
  const response = await fetch(`${API_URL}/api/gps/status`);
  if (!response.ok) {
    throw new Error("Error reading GPS");
  }
  return await response.json();
};

export const readSettings = async () => {
  const response = await fetch(`${API_URL}/api/settings`);
  if (!response.ok) {
    throw new Error("fetch /api/settings, error: ", response.status);
  }
  return await response.json();
};

export const readDF = async () => {
  const response = await fetch(`${API_URL}/df`);
  if (!response.ok) {
    throw new Error("Error reading DF");
  }

  const resText = await response.text();
  if (!resText || resText.trim() === "") {
    throw new Error("DF data is empty");
  }

  const dataArray = resText.split(",").map(v => v.trim());

  if (dataArray.length < 377) {
    throw new Error("Incomplete DF data");
  }

  const data = {
    time: dataArray[0].trim(),
    heading: dataArray[1].trim(),
    confidence: dataArray[2].trim(),
    power: dataArray[3].trim(),
    polar: dataArray.slice(17, 377).map(Number).reverse(),
  };

  return data;
};

export function decimalToDMS(decimal, isLatitude) {
  if (isNaN(decimal) || decimal < -180 || decimal > 180) {
    throw new Error("Invalid decimal degrees");
  }

  // Get the absolute value for the conversion
  const positiveDecimal = Math.abs(decimal);

  // Calculate degrees, minutes, and seconds
  const degrees = Math.floor(positiveDecimal);
  const minutesDecimal = (positiveDecimal - degrees) * 60;
  const minutes = Math.floor(minutesDecimal);
  const seconds = (minutesDecimal - minutes) * 60;

  let direction = "";
  if (isLatitude) {
    direction = decimal >= 0 ? "N" : "S";
  } else {
    direction = decimal >= 0 ? "E" : "W";
  }

  const dmsString = `${degrees}°${minutes}'${seconds.toFixed(2)}"${direction}`;

  return dmsString;
}

export function dmsToDecimal(dmsString) {
  // Regular expression to extract degrees, minutes, seconds, and direction
  const dmsRegex =
    /(-?\d+(?:\.\d+)?)[°](\d+(?:\.\d+)?)['′](\d+(?:\.\d+)?)(?:["″])?([NSEW])/i;
  const matches = dmsString.match(dmsRegex);

  if (!matches) {
    showNotifBox(
      "Error",
      `Masukan Format Koordinat dengan benar\nContoh:\nLatitude: 6°10'31.36"S\nLongitude: 106°49'37.26"E`
    );
  }

  const degrees = parseFloat(matches[1]);
  const minutes = parseFloat(matches[2]);
  const seconds = parseFloat(matches[3]);
  const direction = matches[4];

  let decimalDegrees = degrees + minutes / 60 + seconds / 3600;

  if (direction === "S" || direction === "W") {
    decimalDegrees *= -1;
  }

  return decimalDegrees;
}

export function isDmsRegexMatch(dmsString) {
  const dmsRegex =
    /(-?\d+(?:\.\d+)?)[°](\d+(?:\.\d+)?)['′](\d+(?:\.\d+)?)(?:["″])?([NSEW])/i;
  const matches = dmsString.match(dmsRegex);

  if (matches) {
    return true;
  } else {
    return false;
  }
}
